import express from "express";
import cinemaCotroler from "../controler/cinemaControler";

const router = express.Router();
const initApiRoute = (app) => {
  router.get("/get-cinema", cinemaCotroler.getAllCity);
  router.get("/get-cinema/:id", cinemaCotroler.getAllCinema);
  router.get("/get-cinema-calendar/", cinemaCotroler.getCinemaCalendar);

  router.post("/user/login/", cinemaCotroler.getPopcornCombo);

  return app.use("/api/", router);
};

export default initApiRoute;
