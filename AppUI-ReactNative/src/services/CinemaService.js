import axios from "./myAxios";
import { api } from "../config/index";

const getCities = () => {
  return axios.get(api.cinema);
};

const getCinemaByCity = (id) => {
  return axios.get(api.cinema + `/${id}`);
};

const getCinemaCalendar = (cinemaId, date) => {
  return axios.get(
    // `/api/get-cinema-calendar?cinemaid=${cinemaId}&date=${date}`
    api.cinema_calendar + `?cinemaid=${cinemaId}&date=${date}`
  );
};

const getMovieCalendar = (cinemaId, date, movieName) => {
  return axios.get(
    // `/api/get-cinema-calendar?cinemaid=${cinemaId}&date=${date}&moviename=${movieName}`
    api.cinema_calendar +
      `?cinemaid=${cinemaId}&date=${date}&moviename=${movieName}`
  );
};

const getPopcornCombo = () => {
  // return axios.get("/api/get-popcorn-combo");
  return axios.get(api.popcorncombo);
};

const saveReservationTicket = (data) => {
  // return axios.post("/api/save-reservation", data);
  return axios.post(api.save_reservation, data);
};

export {
  getCities,
  getCinemaByCity,
  getCinemaCalendar,
  getPopcornCombo,
  getMovieCalendar,
  saveReservationTicket,
};
