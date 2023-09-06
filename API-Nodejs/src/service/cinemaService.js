import db from "../models";

const getCity = async () => {
  let cityList = [];
  cityList = await db.City.findAll({
    attributes: ["id", "cityName", "description"],
  });
  return cityList;
};

const getCinema = async (id) => {
  let cinemaList = [];
  cinemaList = await db.Cinema.findAll({
    attributes: ["id", "cinemaName", "description"],
    where: { cityId: id },
  });
  return cinemaList;
};

const getCineCalendar = async (date, cinemaId) => {
  let calendarList = [];
  calendarList = await db.CinemaCalendar.findAll({
    attributes: ["id", "CinemaId", "ScreenCalendarId", "date"],
    include: {
      model: db.ScreenCalendar,
      attributes: ["id", "date", "MovieId", "ScreenId"],
      // where: { cinemaId: cinemaId },
      include: [{ model: db.Movie }, { model: db.Screen }],

      // attributes: ["id", "date", "MovieId", "ScreenId"],
      // include: {
      //   model: db.Screen,
      //   // attributes: ["id", "date", "MovieId", "ScreenId"],
      // },
    },
    where: { date: date, cinemaId: cinemaId },
  });
  console.log(">> serveice ", calendarList);
  return calendarList;
};

module.exports = {
  getCity,
  getCinema,
  getCineCalendar,
};
