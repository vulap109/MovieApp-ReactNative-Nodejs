import db from "../models";
import { verifyToken } from "../middleWare/JWTAction";

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

const getCineCalendar = async (date, cinemaId, movieName = null) => {
  let calendarList = [];
  if (movieName) {
    calendarList = await db.CinemaCalendar.findAll({
      attributes: ["id", "CinemaId", "ScreenCalendarId", "date"],
      include: {
        model: db.ScreenCalendar,
        attributes: ["id", "date", "MovieId", "ScreenId"],
        include: [
          { model: db.Movie, where: { movieName: movieName } },
          { model: db.Screen },
        ],
        right: true,
      },
      where: { date: date, cinemaId: cinemaId },
    });
  } else {
    calendarList = await db.CinemaCalendar.findAll({
      attributes: ["id", "CinemaId", "ScreenCalendarId", "date"],
      include: {
        model: db.ScreenCalendar,
        attributes: ["id", "date", "MovieId", "ScreenId"],
        include: [{ model: db.Movie }, { model: db.Screen }],
      },
      where: { date: date, cinemaId: cinemaId },
    });
  }

  return calendarList;
};

const getPopcornService = async () => {
  let popcornList = [];
  popcornList = await db.PopcornCombo.findAll({
    attributes: ["id", "comboName", "description", "price"],
  });
  return popcornList;
};

const saveReservationService = async (rawData) => {
  try {
    let decodeUser = verifyToken(rawData.user);
    console.log("check decodeUser ", decodeUser);
    let chkUser = await checkUser(decodeUser.id);
    if (!chkUser) {
      return { result: false, message: "User is invalid!" };
    }

    const reservation = await db.Reservation.create({
      screenId: rawData.screenId,
      movieId: rawData.movieId,
      userId: rawData.user,
      payment: rawData.payment,
      total: rawData.total,
    });

    if (reservation && reservation.id) {
      if (rawData && rawData.seatSelected) {
        await rawData.seatSelected.map(async (seat) => {
          let ticket = await db.Ticket.create({
            seat: seat.seat,
            price: seatPrice(seat.seat),
          });
          await db.DetailReservation.create({
            reservationId: reservation.id,
            ticketId: ticket.id,
          });
        });
      }
      if (rawData.popComboSelected) {
        await rawData.popComboSelected.map(async (pop) => {
          await db.DetailReservation.create({
            reservationId: reservation.id,
            popcornId: pop.id,
          });
        });
      }
      return {
        result: true,
        message: "Save tiket success",
        reservationId: reservation.id,
      };
    }

    return {
      result: false,
      message: "Save tiket falled",
    };
  } catch (error) {
    console.log("error save reservation: ", error);
    return {
      result: false,
      message: "something wrong in service ...",
    };
  }
};

const checkUser = async (userId) => {
  let user = await db.User.findOne({
    where: { id: userId },
  });
  if (user) {
    return true;
  }
  return false;
};

const seatPrice = (seat) => {
  const seatVIP = ["D", "E", "F", "G", "H", "I", "J"];
  let total = 0;
  let row = seat.slice(0, 1);
  if (seatVIP.includes(row)) {
    total += 90000;
  } else if (row === "K") {
    total += 120000;
  } else {
    total += 75000;
  }

  return total;
};

const getOccupiedService = async (rawData) => {
  try {
    let listSeats = await db.Ticket.findAll({
      attributes: ["id", "seat", "price", "description"],
      include: {
        model: db.DetailReservation,
        attributes: [],
        include: {
          model: db.Reservation,
          where: {
            screenId: 1,
            movieId: 1,
          },
        },
        right: true,
        where: { popcornId: null },
      },
      // where: { date: date, cinemaId: cinemaId },
    });

    console.log(" data seat occupie", listSeats);
    let listResult = [];
    if (listSeats) {
      listSeats.map((item) => {
        listResult.push(item.seat);
      });
    }

    return {
      result: true,
      listSeatsOccupied: listResult,
    };
  } catch (error) {
    console.log("error getOccupiedService: ", error);
    return {
      result: false,
      message: "something wrong in service ...",
    };
  }
};

module.exports = {
  getCity,
  getCinema,
  getCineCalendar,
  getPopcornService,
  saveReservationService,
  getOccupiedService,
};
