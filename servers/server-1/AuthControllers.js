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
