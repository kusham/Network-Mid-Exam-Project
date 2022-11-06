const express = require("express");
const { registerUser, loginUser, getUser, getAllUsers, updateUser, deleteUser, followUser, unFollowUser } = require("./AuthControllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get('/:id', getUser);
router.get('/users/all',getAllUsers)
router.put('/user/:id',  updateUser)
router.delete('/:id',  deleteUser)
router.put('/:id/follow',  followUser)
router.put('/:id/unfollow',  unFollowUser)



module.exports = router;
