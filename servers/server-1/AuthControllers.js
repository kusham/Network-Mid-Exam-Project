const UserModel = require("./UserModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res) => {
  console.log("register");
  console.log(req.body);

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = new UserModel(req.body);

    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "This email already has a account" });
    }
    const savedUser = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      success: true,
      message: "User successfully registered",
      user: savedUser,
      token : token
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Registration is failed",
      error: error.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  console.log("login");
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const passwordValidity = await bcrypt.compare(password, user.password);

      if (!passwordValidity) {
        return res.status(400).json({success: false, message : "Invalid credentials"});
      }
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ success: true, user: user, token: token });
    } else {
      res.status(404).json({ success: true, message: "This user not found" });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Login is failed",
      error: error.message,
    });
  }
};



module.exports.getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No such user",
      });
    }
    const { password, ...otherDetails } = user._doc;

    res.status(200).json({
      success: true,
      message: "User is fetched successfully",
      user: otherDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "can not get user",
      error: error.message,
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json({
      success: true,
      message: "users are fetched successfully",
      users: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "can not  all users",
      error: error.message,
    });
  }
};
module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  // console.log("Data Received", req.body)
  const { _id, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      console.log(user);

      res.status(200).json({
        success: true,
        message: "User has successfully updated",
        user: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "User has not updated",
        error: error.message,
      });
    }
  } else {
    res
      .status(403)
      .json("Access Denied! You can update only your own Account.");
  }
};
module.exports.deleteUser = async (req, res) => {};
module.exports.followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  console.log(id, _id);
  if (_id == id) {
    return res
      .status(403)
      .json({ success: false, message: "Action Forbidden" });
  }
  try {
    const followingUser = await UserModel.findById(_id);
    const followUser = await UserModel.findById(id);

    if (followUser.followers.includes(_id)) {
      return res.status(403).json({
        success: false,
        message: "you are already following this person",
      });
    }
    await followUser.updateOne({ $push: { followers: _id } });
    await followingUser.updateOne({ $push: { following: id } });
    res.status(200).json({ success: true, message: "User followed!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "following is failed" });
  }
};
module.exports.unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  console.log(id, _id);

  if (_id == id) {
    return res
      .status(403)
      .json({ success: false, message: "Action Forbidden" });
  }
  try {
    const unFollowingUser = await UserModel.findById(_id);
    const unFollowUser = await UserModel.findById(id);

    if (!unFollowUser.followers.includes(_id)) {
      return res
        .status(403)
        .json({ success: false, message: "You are not following this User" });
    }
    await unFollowUser.updateOne({ $pull: { followers: _id } });
    await unFollowingUser.updateOne({ $pull: { following: id } });
    res
      .status(200)
      .json({ success: true, message: "UnFollowed Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "unFollowing is failed" });
  }
};
