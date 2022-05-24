require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
//const { hash } = require("bcrypt");



exports.getUser = async (req, res) => {
  // get a specific object using the id
  let findUser = await User.findOne({ _id: req.params.id });
  res.status(200).json({
    message: "Successful ",
    data: findUser,
  });
};

// exports.login = async (req, res) => {
  
//   const { userName, password } = req.body;

//   if (!(userName && password)) {
//     res.status(400).send("All input is required");
//   }

//   const user = await User.findOne({ userName });

//   if (user && (await compare(password, user.password))) {
//     // Create token
//     const token = jwt.sign(
//       { user_id: user._id, userName },
//       process.env.TOKEN_KEY,
//       {
//         expiresIn: "2h",
//       }
//     );

//     // save user token
//     user.token = token;

//     // user
//     res.status(200).json({
//       message: "Successful ",
//       data: user,
//     });
//   }
 

  
// };

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
