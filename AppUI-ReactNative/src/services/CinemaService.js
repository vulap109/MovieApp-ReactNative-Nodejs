import axios from "./myAxios";
import { API } from "../config/index";

const getCities = () => {
  return axios.get(API.cinema);
};

const getCinemaByCity = (id) => {
  return axios.get(API.cinema + `/${id}`);
};

const getCinemaCalendar = (cinemaId, date) => {
  return axios.get(API.cinema_calendar + `?cinemaid=${cinemaId}&date=${date}`);
};

const getMovieCalendar = (cinemaId, date, movieName) => {
  return axios.get(
    API.cinema_calendar +
      `?cinemaid=${cinemaId}&date=${date}&moviename=${movieName}`
  );
};

const getPopcornCombo = () => {
  return axios.get(API.popcorncombo);
};

const saveReservationTicket = (data) => {
  return axios.post(API.save_reservation, data);
};

const getOccupiedSeats = (data) => {
  return axios.post(API.get_occupied_seats, data);
};

export {
  getCities,
  getCinemaByCity,
  getCinemaCalendar,
  getPopcornCombo,
  getMovieCalendar,
  saveReservationTicket,
  getOccupiedSeats,
};
