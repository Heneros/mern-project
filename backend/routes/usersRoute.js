const express = require('express');
const {  checkAuth } = require('../middleware/authMiddleware');
const role = require('../middleware/roleMIddleware');
const { getAllPublicUsers } = require('../controllers/users/getAllPublicUsers');
const { getAllFavorites } = require('../controllers/users/getAllFavorites');
// const {
// authUser
// } = require("../controllers/users/authUser");
const { getUserProfile } = require('../controllers/users/getUserProfile');
const { updateUser } = require('../controllers/users/updateUser');
const { getUser } = require('../controllers/users/getUser');
const { addToFavorites } = require('../controllers/users/addToFavorites');
const {
    deleteFavoritePost,
} = require('../controllers/users/deleteFavoritePost');
const { getAllUsers } = require('../controllers/users/getAllUsers');
const { deleteUser } = require('../controllers/users/deleteUser');

const { updateUserProfile } = require('../controllers/users/updateUserProfile');
const  deleteMyAccount  = require('../controllers/users/deleteMyAccount');
const feedbackForm = require('../utils/email');

const router = express.Router();

router.route('/').get(checkAuth, role.checkRole(role.ROLES.Admin), getAllUsers);
router.route('/allusers').get(getAllPublicUsers);

router
    .route('/profile')
    .get(checkAuth, getUserProfile)
    .put(checkAuth, updateUserProfile)
    .delete(checkAuth, deleteMyAccount);

router.route('/:id').get(checkAuth, role.checkRole(role.ROLES.Admin), getUser).delete(checkAuth, role.checkRole(role.ROLES.Admin), deleteUser).put(checkAuth, role.checkRole(role.ROLES.Admin), updateUser);
// router.route("/logout").post(logoutUser);

router.route('/feedback').post(feedbackForm);

router.route('/addfavorite/:userId/:postId').post(addToFavorites);
router.route('/deletefavorite/:userId/:postId').delete(deleteFavoritePost);
router.route('/getfavorites/:userId').get(checkAuth, getAllFavorites);

module.exports = router;
