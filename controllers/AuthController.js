require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const { hash, compare } = require("bcrypt");

signToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: "1800s",
  });
  return token;
};

exports.createUser = async (req, res) => {
  const { userName, password, firstName, lastName, gender } = req.body;

  if (!(userName && password && firstName && lastName && gender)) {
    res.status(400).send("All input is required");
  }

  // inputs

  //checks the inputs
  let findExistingUser = await User.findOne({ userName });
  if (findExistingUser) {
    res.status(400).json({ message: "User Already Exist. Please Login" });
  }
  // hashing the password
  const enc_pwd = await hash(password, 10);
  const newUser = new User({
    userName: userName,
    password: enc_pwd,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
  });
  let saveNewUser = await newUser.save();

  // Create token
  saveNewUser.token = signToken({ user_id: saveNewUser._id, userName });
  res.status(201).json({
    message: "Successfully added new user",
    data: saveNewUser,
  });
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  if (!(userName && password)) {
    res.status(400).send("All input is required");
  }

  const user = await User.findOne({ userName });

  if (user && (await compare(password, user.password))) {
    // Create token
    user.token = signToken({ user_id: user._id, userName });

    // user
    res.status(200).json({
      message: "Successful ",
      data: user,
    });
  } else {
    res.status(400).json({ message: "User does not exist. Please Register" });
  }
};

exports.protect = async (req, res, next) => {
  // gets the token from the query
  const token = req.query.token;

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    //check if payload matches a db user
    const user = await User.findById(decoded.user_id);
    if (!user) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    // getting a payload from the request and assigning it to the decoded
    req.principal = decoded;
    //console.log( req.principal);
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  //console.log( req.principal.userName);
  return next();
};
