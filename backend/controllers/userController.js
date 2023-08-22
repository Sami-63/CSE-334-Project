import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("register email e asi");

  const userExist = await User.findUserByEmail(email);

  console.log("userExists -> ", userExist);

  if (userExist.data) {
    res.status(400);
    throw new Error("User already exists");
  }

  const { data, error } = await User.create(name, email, password);

  console.log("in controller = data -> ", data);
  console.log("in controller = error -> ", error);

  const user = data;

  if (!error && user) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      userType: user.userType,
      token: generateToken({
        name: user.name,
        email: user.email,
        userType: user.userType,
      }),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const response = await User.findUserByEmail(email);
  console.log(response);

  if (response.data) {
    const { data, error } = await User.checkLogin(email, password);

    console.log("data -> ", data);
    console.log("error -> ", error);

    if (error) {
      res.status(401).send({ error });
      throw new Error("error occured while login");
    } else {
      if (data) {
        res.json({
          name: response.data.name,
          email: response.data.email,
          userType: response.data.userType,
          token: generateToken({
            name: response.data.name,
            email: response.data.email,
            userType: response.data.userType,
          }),
        });
      } else {
        res.status(401).send({ error: "invalid password" });
        throw new Error("Invalid password");
      }
    }
  } else {
    res.status(401).send({ error: "Invalid email" });
    console.log(response.error);
    throw new Error("Invalid email");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const response = await User.findUserByEmail(email);

  const user = response.data;
  // console.log("user -> ", user);
  // console.log("email -> ", email);

  if (user) {
    const { password, ...other } = user;
    res.json({
      ...other,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { nidNumber, phoneNumber, bankName, accountNumber, bkashNumber } =
    req.body;

  if ((!bankName && accountNumber) || (bankName && !accountNumber)) {
    res.status(401);
    throw new Error("Provide both bank name and account number");
  }

  const response = await User.findUserByEmail(req.user.email);
  const user = response.data;

  if (user) {
    try {
      const user = await User.updateProfile(
        req.user.email,
        nidNumber,
        phoneNumber,
        bankName,
        accountNumber,
        bkashNumber
      );
      console.log(response);

      res.send(user);
    } catch (error) {
      res.status(401);
      throw new Error("Update unsuccessful");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { registerUser, authUser, getUserProfile, updateUserProfile };
