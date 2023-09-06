import axios from "./myAxios";

const getCities = () => {
  return axios.get("/api/get-cinema");
};

const getCinemaByCity = (id) => {
  return axios.get(`/api/get-cinema/${id}`);
};

const getCinemaCalendar = (cinemaId, date) => {
  return axios.get(
    `/api/get-cinema-calendar?cinemaid=${cinemaId}&date=${date}`
  );
};

export { getCities, getCinemaByCity, getCinemaCalendar };
