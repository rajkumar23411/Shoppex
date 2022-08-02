const express = require("express");
const app = express();
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const ErrorHandler = require("./middleware/error");
const cors = require("cors");
// const path = require("path");

app.use(cors());
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({ path: "config/config.env" });
 }
app.use(express.json({limit: "50mb", extended: true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit:"50mb" ,extended: true }));
app.use(fileUpload());
app.use("/api", routes);
// app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(ErrorHandler);
module.exports = app;
