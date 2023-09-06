import axios from "./myAxios";

const getCities = () => {
  return axios.get("/api/get-cinema");
};

const getCinemaByCity = (id) => {
  return axios.get(`/api/get-cinema/${id}`);
};

const getCinemaCalendar = () => {
  return axios.get(`/api/get-cinema-calendar`);
};

export { getCities, getCinemaByCity, getCinemaCalendar };
