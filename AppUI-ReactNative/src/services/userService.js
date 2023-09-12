import axios from "./myAxios";

const userLogin = (account, password) => {
  return axios.post("/api/user/login", { account, password });
};

const userSignUp = (email, phone, password, fullName) => {
  return axios.post("/api/user/register", { email, phone, password, fullName });
};

export { userLogin, userSignUp };
