const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

require("dotenv").config();

const userRoutes = require("./routes/user");
// const postRoutes = require("./routes/post");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.SECRET_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie."))
  .catch(() => console.log("Connexion à MongoDB échouée."));

const app = express();
helmet({
  crossOriginResourcePolicy: false,
});

//-----------------------------------------------------------------------------------------------
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", userRoutes);
// app.use("/api/post", postRoutes);
//-----------------------------------------------------------------------------------------------
module.exports = app;
