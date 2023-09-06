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
    let CinemaCalendarlst = [];
    CinemaCalendarlst = await cinemaService.getCineCalendar(
      "2023/08/31 10:00",
      3
    );
    console.log(">>> check calendar ", CinemaCalendarlst);
    return res
      .status(200)
      .json({ result: true, resultList: CinemaCalendarlst });
  } catch (error) {
    console.log("error: ", error);

    return res.status(500).json({ result: true, message: "Error from server" });
  }
};

module.exports = { getAllCity, getAllCinema, getCinemaCalendar };
