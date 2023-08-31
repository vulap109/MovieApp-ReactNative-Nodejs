require("dotenv").config();
import express from "express";
import initApiRoute from "./routes/api";
import connection from "../src/config/connectDB";

const app = express();
const PORT = process.env.PORT || 8081;

// connect DB
connection();

//init route API
initApiRoute(app);

// handle page not found
app.use((req, res) => {
  return res.send("404 not found");
});

app.listen(PORT, () => {
  console.log(">>> app running on Port: ", PORT);
});
