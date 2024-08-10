const User = require('../../models/Users');
const asyncHandler = require('../../middleware/asyncHandler');

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const userId = req.user._id;



    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        const fieldsToUpdate = req.body;
        const updatedProfile = await User.findByIdAndUpdate(user._id, {...fieldsToUpdate},     { new: true, runValidators: true });

        const updatedUser = await user.save();

        res.status(200).json({
              success: true,
              message: `${user.username} , your profile was successfully updated`,
              updatedProfile
            // _id: updatedUser._id,
            // username: updatedUser.username,
            // email: updatedUser.email,
            // isAdmin: updatedUser.isAdmin,
            // isEditor: updatedUser.isEditor,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = { updateUser };
