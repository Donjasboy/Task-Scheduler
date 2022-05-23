const User = require("./../models/User");
const { hashSync } = require("bcrypt");

exports.createUser = async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    password: hashSync(req.body.password, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
  });
  let findExistingUser = await User.findOne({ userName: req.body.userName });

  if (!findExistingUser) {
    let saveNewUser = await newUser.save();
    res.status(201).json({
      message: "Successfully added new user",
      data: saveNewUser,
    });
  } else {
    res.status(400).json({ message: "Username already exists" });
  }
};

exports.getUser = async (req, res) => {
  // get a specific object using the id
  let findUser = await User.findOne({ _id: req.params.id });
  res.status(200).json({
    message: "Successful ",
    data: findUser,
  });
};

exports.updateUser = async (req, res) => {
  let updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
    },
    { new: true }
  );
  res.status(200).json({
    message: "Successfully updated ",
    data: updateUser,
  });
};
