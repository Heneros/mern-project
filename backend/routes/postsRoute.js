const express = require('express');
const router = express.Router();
const {  checkAuth } = require('../middleware/authMiddleware');
const { getAllPosts } = require('../controllers/posts/getAllPosts');
const { createPost } = require('../controllers/posts/createPost');
const { getAll } = require('../controllers/posts/getAll');
const { createPostComment } = require('../controllers/posts/createPostComment');
const { getPost } = require('../controllers/posts/getPost');
const { updatePost } = require('../controllers/posts/updatePost');
const { deletePost } = require('../controllers/posts/deletePost');

const {ROLES , checkRole} = require('../middleware/roleMIddleware');

const checkObjectId = require('../middleware/checkObjectId');

router
    .route('/')
    .get(getAllPosts)
    .post(checkAuth,  checkRole('Admin', 'Editor'),createPost);
router.route('/getall').get(getAll);

router.route('/:id/comments').post(checkAuth, checkObjectId, createPostComment);

router
    .route('/:id')
    .get(checkObjectId, getPost)
    .put(checkAuth, checkRole('Admin', 'Editor'),checkObjectId, updatePost)
    .delete(checkAuth,  checkRole('Admin', 'Editor'),checkObjectId, deletePost);
 
module.exports = router;
