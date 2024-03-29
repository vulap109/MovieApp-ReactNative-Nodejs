import express from "express";
import cinemaControler from "../controler/cinemaControler";
import userControler from "../controler/userControler";

const router = express.Router();
const initApiRoute = (app) => {
  router.get("/get-cinema", cinemaControler.getAllCity);
  router.get("/get-cinema/:id", cinemaControler.getAllCinema);
  router.get("/get-cinema-calendar", cinemaControler.getCinemaCalendar);
  router.get("/get-popcorn-combo", cinemaControler.getPopcornCombo);
  router.post("/save-reservation", cinemaControler.saveReservation);
  router.post("/get-occupied-seats", cinemaControler.getOccuppiedSeats);

  router.post("/user/login", userControler.loginAPI);
  router.post("/user/register", userControler.regesterAPI);
  router.post("/user/update-avatar", userControler.updateAvatar);
  router.post("/user/info", userControler.getInfo);

  return app.use("/api/", router);
};

export default initApiRoute;
