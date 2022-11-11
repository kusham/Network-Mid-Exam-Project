const PostModel = require("./PostModel");
const mongoose = require("mongoose");
const axios = require("axios");
const getImageUrl = require("./postServices");

// create post
module.exports.createPost = async (req, res) => {
  console.log("create post");
  const newPost = new PostModel(req.body);

  try {
    const createdPost = await newPost.save();
    if (!createdPost) {
      return res.status(400).json({
        success: false,
        message: "post is not created",
      });
    }
    const post = createdPost._doc;

    if (post.image) {
      post.profilePicUrl = await getImageUrl(post.image);
    }

    res.status(200).json({
      success: true,
      message: "post successfully created",
      post: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "post is not created",
      error: error.message,
    });
  }
};

// get a single post
module.exports.getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "can not find post",
      });
    }
    res.status(200).json({
      success: true,
      message: "post is found",
      post: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "post is not found",
      error: error.message,
    });
  }
};

// update a post
module.exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Authentication failed" });
    }
    await post.updateOne({ $set: req.body });
    res.status(200).json({
      success: true,
      message: "post is updated",
      post: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "update failed",
      error: error.message,
    });
  }
};

// delete a post
module.exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Action forbidden" });
    }
    await post.deleteOne();
    res.status(200).json({
      success: true,
      message: "post is deleted",
      post: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "delete failed",
      error: error.message,
    });
  }
};

// module.exports.getTimelinePosts = async (req, res) => {};

// like/dislike a post
module.exports.likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ success: true, message: "Post disliked" });
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ success: true, message: "Post liked" });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "failed",
      error: error.message,
    });
  }
};

// Get timeline posts
module.exports.getTimelinePosts = async (req, res) => {
  console.log("get timeline");
  const userId = req.params.id;
  try {
    let userPosts = await PostModel.find({ userId: userId });
    const response = await axios.get(`http://localhost:5000/auth/${userId}`);
    const user = response.data.user;

    console.log("userPost");
    // console.log(userPosts);
    console.log(user.following);

    await Promise.all(
      user.following.map(async (followingUserId) => {
        const followingUserPosts = await PostModel.find({
          userId: followingUserId,
        });
        console.log("follow");
        userPosts = userPosts.concat(followingUserPosts);
      })
    );

    console.log("object");
    console.log(userPosts);
    userPosts = await Promise.all(
      userPosts.map(async (post) => {
        post = post._doc;
        if (post.image) {
          post.postImageUrl = await getImageUrl(post.image);
        }

        return post;
      })
    );
    console.log(userPosts);
    // const currentUser = await UserModel.findById(userId)
    // const followingPosts = await UserModel.aggregate([
    //   {
    //     $match: {
    //       _id: new mongoose.Types.ObjectId(userId),
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "posts",
    //       localField: "following",
    //       foreignField: "userId",
    //       as: "followingPosts",
    //     },
    //   },
    //   {
    //     $project: {
    //       followingPosts: 1,
    //       _id: 0,
    //     },
    //   },
    // ]);
    // console.log(followingPosts);
    // let posts = [];
    // await Promise.all(
    //   followingPosts[0].followingPosts.map(async (post) => {
    //     const user = await UserModel.findById(post.userId);
    //     posts.push({ ...post, userName: user.userName });
    //   })
    // );
    // const userPost = [];
    // await Promise.all(
    //   currentUserPosts.map(async (post) => {
    //     userPost.push({ ...post._doc, userName: currentUser.userName });
    //   })
    // );
    // console.log(userPost);

    res.status(200).json(
      //   userPost.concat(...posts).sort((a, b) => {
      //     return new Date(b.createdAt) - new Date(a.createdAt);
      //   }
      //   )
      { success: true, message: "Post successfully fetched", posts: userPosts }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.commentPost = async (req, res) => {
  console.log("commented");
  const id = req.params.id;
  const { userId, comment } = req.body;
  console.log(comment);
  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res
        .status(400)
        .json({ success: false, message: "There is no such post" });
    }

    await PostModel.updateOne(
      { _id: id },
      { $push: { comments: { userId: userId, comment: comment } } }
    );
    // console.log(ob);
    res.status(200).json({ success: true, message: "comment added" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "comment dit not add",
      error: error.message,
    });
  }
};
