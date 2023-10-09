import axios from "./myAxios";
import { API } from "../config/index";

const userLogin = (account, password) => {
  return axios.post(API.user_login, { account, password });
};

const userSignUp = (email, phone, password, fullName) => {
  return axios.post(API.user_register, { email, phone, password, fullName });
};

const userUpdateAvatar = (user, avatarImg) => {
  return axios.post(API.user_update_avatar, { user, avatarImg });
};

const getUserInfo = (user) => {
  return axios.post(API.user_get_info, { user });
};

export { userLogin, userSignUp, userUpdateAvatar, getUserInfo };
