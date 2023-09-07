import axios from "./myAxios";

const userLogin = (email, password) => {
  return axios.post("/api/get-cinema", { email, password });
};

export { userLogin };
