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

const getMovieCalendar = (cinemaId, date, movieName) => {
  return axios.get(
    `/api/get-cinema-calendar?cinemaid=${cinemaId}&date=${date}&moviename=${movieName}`
  );
};

const getPopcornCombo = () => {
  return axios.get("/api/get-popcorn-combo");
};

export {
  getCities,
  getCinemaByCity,
  getCinemaCalendar,
  getPopcornCombo,
  getMovieCalendar,
};
