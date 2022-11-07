const express = require('express');
const { createPost, getPost, updatePost, deletePost, likePost, getTimelinePosts, commentPost } = require('./PostControllers');


const router = express.Router()


router.post('/',createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)
router.post('/:id/comment', commentPost)



module.exports = router;