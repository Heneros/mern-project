const resendEmailVerificationToken = require("../controllers/auth/resendVerifyEmailController");
const registerUser = require("../controllers/auth/registerController");
const verifyEmail = require("../controllers/auth/verifyEmailController");
const authUser = require("../controllers/auth/authUser");
const logoutUser = require("../controllers/auth/logoutUser");

const { loginLimiter } = require("../middleware/apiLimiter");
const newAccessToken = require("../controllers/auth/refreshTokenController");


const express = require("express");
const { resetPassword, resetPasswordRequest } = require("../controllers/auth/passwordResetController");
const User = require("../models/Users");
const passport = require("passport");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.route("/register").post(registerUser)
router.route("/verify/:emailToken/:userId").get(verifyEmail);
router.route("/login").post(authUser);
router.route("/new_access_token").get(newAccessToken);
router.route("/resend_email_token").post(resendEmailVerificationToken);
router.route("/reset_password_request").post(resetPasswordRequest);
router.route("/reset_password").post(resetPassword);
router.route("/logout").get(logoutUser);

router.route("/google").get(passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
}))


router.route("/google/redirect").get(
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
    }),

    async (req, res) => {
        try {
            const existingUser = await User.findById(req.user.id);
            if (!existingUser) {
                return res.status(404).send('User not found');
            }

            const payload = {
                id: req.user.id,
                roles: existingUser.roles,
                username: existingUser.username,
                provider: existingUser.provider,
            };

            jwt.sign(
                payload,
                process.env.JWT_ACCESS_SECRET_KEY,
                { expiresIn: '30m' },
                (err, token) => {
                    if (err) {
                        console.log(err)

                        return res.status(500).send('Error generating token');

                    }
                    console.log(token)

                    const jwt = `${token}`;
                    const embedJWT = `
                        <html>
                          <script>
                            window.localStorage.setItem("googleToken", '${jwt}');
                            window.location.href = 'https://backend-rest-six.vercel.app/profile';
                          </script>
                        </html>
                      `;
                    res.send(embedJWT);
                    // res.redirect(`https://backend-rest-six.vercel.app/auth-callback?token=${token}`);

                }
            );
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }

    }
)

module.exports = router;