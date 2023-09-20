import axios from "./myAxios";

const userLogin = (account, password) => {
  return axios.post("/api/user/login", { account, password });
};

const userSignUp = (email, phone, password, fullName) => {
  return axios.post("/api/user/register", { email, phone, password, fullName });
};

const userUpdateAvatar = (user, avatarImg) => {
  return axios.post("/api/user/update-avatar", { user, avatarImg });
};

const getUserInfo = (user) => {
  return axios.post("/api/user/info", { user });
};

export { userLogin, userSignUp, userUpdateAvatar, getUserInfo };
