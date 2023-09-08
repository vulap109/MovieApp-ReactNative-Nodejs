import axios from "./myAxios";

const userLogin = (account, password) => {
  return axios.post("/api/user/login", { account, password });
};

export { userLogin };
