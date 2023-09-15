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
    let chkUser = await checkUser(rawData.userId);
    if (!chkUser) {
      return { result: false, message: "User is invalid!" };
    }

    const reservation = await db.Reservation.create({
      screenId: rawData.screen.id,
      movieId: rawData.movie.id,
      userId: rawData.userId,
      // payment: rawData.paymentMethod,
      // total: rawData.total
    });

    const ticket = await db.Ticket.create({
      seat: rawData.seat,
      price: rawData.price,
    });

    const detailRes = await db.DetailReservation.create({
      reservationId: reservation.id,
      ticketId: ticket.id,
      popcornId: rawData.popcornId,
    });
    return {
      result: true,
      message: "Save tiket success",
      reservationId: reservation.id,
    };
  } catch (error) {
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

module.exports = {
  getCity,
  getCinema,
  getCineCalendar,
  getPopcornService,
  saveReservationService,
};
