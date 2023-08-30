import express from "express";
import cinemaCotroler from "../controler/cinemaControler";

const router = express.Router();
const initApiRoute = (app) => {
  router.get("/get-cinema", cinemaCotroler.getAllCinema);

  return app.use("/api/", router);
};

export default initApiRoute;
