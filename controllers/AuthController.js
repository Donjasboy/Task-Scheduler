require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const {hash,compare } = require("bcrypt");

signToken = (payload)=>{
    const token = jwt.sign(
      payload,
      process.env.TOKEN_KEY,
      {
        expiresIn: "1800s",
      }
    );
    return token;
  }

exports.createUser = async (req, res) => {
    // hashing the password
    let enc_pwd = await hash(req.body.password, 10);
    // inputs
    const newUser = new User({
      userName: req.body.userName,
      password: enc_pwd,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
    });
  
    const {userName,password,firstName,lastName,gender} = req.body;
    if (!(userName && password && firstName && lastName && gender )) {
      res.status(400).send("All input is required");
    }
  //checks the inputs
    let findExistingUser = await User.findOne({ userName});
    if (findExistingUser) {
      res.status(400).json({ message: "User Already Exist. Please Login" });
    }
    
    let saveNewUser = await newUser.save();
  
    // Create token
    saveNewUser.token = signToken({ user_id: saveNewUser._id, userName });
    // let updateToken =  await User.findByIdAndUpdate(
    //   saveNewUser._id,
    //   {
    //     token,
    //   },
    //   { new: true }
    // );
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
    }
   
  
    
  };