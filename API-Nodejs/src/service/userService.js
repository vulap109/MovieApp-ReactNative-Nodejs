import db from "../models";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  // hash password
  return bcrypt.hashSync(password, salt);
};

// check email is exist?
const checkEmailPhone = async (email, phone) => {
  let user = await db.User.findOne({
    where: { email: email },
  });
  let checkPhone = await db.User.findOne({
    where: { phone: phone },
  });
  // if has one return true
  if (user || checkPhone) {
    return true;
  }
  return false;
};

// sevice register user
const registerUser = async (rawUser) => {
  try {
    // console.log(">>> check email exist:", checkEmail(rawUser.email));
    let checkEmailExist = await checkEmailPhone(rawUser.email, rawUser.phone);
    // if email is exist then return false
    if (checkEmailExist) {
      return {
        result: false,
        messageError: "Email or phone is already exist",
      };
    }
    // check lenght of password
    if (rawUser.password.length < 4) {
      return {
        result: false,
        messageError: "Password have must more than 3 letter",
      };
    }
    // hash password
    const hashpass = hashPassword(rawUser.password);

    // ORM create user
    await db.User.create({
      email: rawUser.email,
      userName: rawUser.userName,
      password: hashpass,
      phone: rawUser.phone,
      fullName: rawUser.fullName,
    });
    return {
      result: true,
      message: "Register successfully!!!",
    };
  } catch (error) {
    // return error if ORM create user has catch
    console.log("error service", error);
    return {
      result: false,
      messageError: "something wrong in service ...",
    };
  }
};

// check hash password
const checkHashPassword = (inputPass, hashPass) => {
  return bcrypt.compareSync(inputPass, hashPass);
};

const loginUser = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.account }, { phone: rawData.account }],
      },
    });

    if (user) {
      // check hash password
      const checkPassword = checkHashPassword(rawData.password, user.password);
      if (checkPassword) {
        // let payload = { email: user.email, phone: user.phone };
        // let token = createJWT(payload);
        // return when login success
        return {
          result: true,
          message: "Login success!",
          access_token: "token",
          fullName: user.fullName,
        };
      }
      console.log(">>> check login user:", user.get({ plain: true }));
    }
    // default return falled
    return {
      result: false,
      message: "your email/phone or password is incorrect!",
    };
  } catch (error) {
    // return error
    console.log("error service login", error);
    return {
      result: false,
      message: "something wrong in service ...",
    };
  }
};

module.exports = {
  registerUser,
  loginUser,
};
