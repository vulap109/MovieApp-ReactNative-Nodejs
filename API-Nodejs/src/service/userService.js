import db from "../models";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { createJWT } from "../middleWare/JWTAction";
import { verifyToken } from "../middleWare/JWTAction";

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
    const user = await db.User.create({
      email: rawUser.email,
      userName: rawUser.userName,
      password: hashpass,
      phone: rawUser.phone,
      fullName: rawUser.fullName,
    });
    console.log("check user create: ", user.id);
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
        let payload = { id: user.id, email: user.email, phone: user.phone };
        let token = createJWT(payload);
        // return when login success
        return {
          result: true,
          message: "Login success!",
          access_token: token,
          fullName: user.fullName,
          avatarImg: user.avatar,
          email: user.email,
          phone: user.phone,
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

const updateAvatarService = async (rawData) => {
  try {
    let decodeUser = verifyToken(rawData.user);
    let chkUser = await db.User.findOne({
      where: { id: decodeUser.id },
    });
    if (!chkUser) {
      return { result: false, message: "User is invalid!" };
    }

    await db.User.update(
      { avatar: rawData.avatarImg },
      {
        where: {
          id: decodeUser.id,
        },
      }
    );

    // default return falled
    return {
      result: true,
      message: "Update avatar successfully!",
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

const getUserInfoService = async (userToken) => {
  try {
    console.log(" user token: ", userToken);
    let decodeUser = verifyToken(userToken.user);
    let user = await db.User.findOne({
      where: { id: decodeUser.id },
    });
    if (!user) {
      return { result: false, message: "User is invalid!" };
    }

    // default return falled
    return {
      result: true,
      userInfo: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        avatarImg: user.avatar,
      },
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
  updateAvatarService,
  getUserInfoService,
};
