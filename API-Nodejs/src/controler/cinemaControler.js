import cinemaService from "../service/cinemaService";

const getAllCity = async (req, res) => {
  try {
    let listCities = [];
    listCities = await cinemaService.getCity();

    return res.status(200).json({ result: true, resultList: listCities });
  } catch (error) {
    return res.status(500).json({ result: true, message: "Error from server" });
  }
};

const getAllCinema = async (req, res) => {
  try {
    let listCinemas = [];
    listCinemas = await cinemaService.getCinema(req.params.id);

    return res.status(200).json({ result: true, resultList: listCinemas });
  } catch (error) {
    return res.status(500).json({ result: true, message: "Error from server" });
  }
};

const getCinemaCalendar = async (req, res) => {
  try {
    console.log(">> check req ", req.query);
    if (req.query.cinemaid && req.query.date) {
      let CinemaCalendarlst = [];
      if (req.query.moviename) {
        CinemaCalendarlst = await cinemaService.getCineCalendar(
          "2023/08/31 10:00",
          +req.query.cinemaid,
          // req.query.moviename
          "OPPENHEIMER"
        );
      } else {
        CinemaCalendarlst = await cinemaService.getCineCalendar(
          "2023/08/31 10:00",
          +req.query.cinemaid
        );
      }
      return res
        .status(200)
        .json({ result: true, resultList: CinemaCalendarlst });
    }
    return res.status(200).json({
      result: false,
      message: "Error from server, can not get query.",
    });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ result: false, message: "Error from server" });
  }
};

const getPopcornCombo = async (req, res) => {
  try {
    let listPopcorn = [];
    listPopcorn = await cinemaService.getPopcornService();

    return res.status(200).json({ result: true, resultList: listPopcorn });
  } catch (error) {
    return res.status(500).json({ result: true, message: "Error from server" });
  }
};

module.exports = {
  getAllCity,
  getAllCinema,
  getCinemaCalendar,
  getPopcornCombo,
};
