require("dotenv").config();

const User = require("./../models/User");

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
