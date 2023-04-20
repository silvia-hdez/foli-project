require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//--- DB Config ---//

require("./config/db.config");

//--- Config middelware Express ---//

const app = express();

app.use(
  cors({
    origin: process.env.ENV === "PROD" ? "*" : "http://localhost:5173",
  })
);

app.use(logger("dev"));
app.use(express.json()); // Para poder tener req.body en peticiones de tipo application/json
//--- Routes ---//

const routes = require("./config/routes.config");
const autheticatedRoutes = require("./config/authenticadedRoutes.config");
const authMiddleware = require("./middelwares/auth.middelware");
app.use(routes)
app.use(authMiddleware.isAuthenticated, autheticatedRoutes);

//--- Handle errors ---//

//*** Middleware si no encuentra ruta ***---//

app.use((req, res, next) => {
  next(createError(StatusCodes.NOT_FOUND, "Route not found")); //Error 404
});

//*** Middleware genérico de errores ***//

app.use((error, req, res, next) => {
  console.error(error);

  if (error instanceof mongoose.Error.ValidationError) {
    //valores no corresponden modelo
    error = createError(StatusCodes.BAD_REQUEST, error); //Error 400
  } else if (error instanceof mongoose.Error.CastError) {
    //Error en tipo entrada valor
    error = createError(StatusCodes.BAD_REQUEST, "Resource not found"); //Error 400
  } else if (error.message.includes("E11000")) {
    // Clave duplicada
    error = createError(StatusCodes.BAD_REQUEST, "Resource already exists"); //Error 400
  } else if (error instanceof jwt.JsonWebTokenError) {
    error = createError(StatusCodes.UNAUTHORIZED, error); //Error no autorizado
  } else if (!error.status) {
    error = createError(StatusCodes.INTERNAL_SERVER_ERROR); //Error 500
  }

  const data = {};

  data.message = error.message;
  data.errors = error.errors
    ? Object.keys(error.errors).reduce((errors, key) => {
        return {
          ...errors,
          [key]: error.errors[key].message || error.errors[key],
        };
      }, {})
    : undefined;

  res.status(error.status).json(data);
});

//--- Server listening ---//

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App initialized at port ${port}`);
});
