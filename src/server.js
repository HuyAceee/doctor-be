import express from "express";
import viewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
import initWebRoutes from "./routes/web";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

app.listen(port, (req, res) => {
  console.log("Running on " + port);
});
