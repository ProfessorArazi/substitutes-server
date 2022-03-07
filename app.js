const express = require("express");
const cors = require("cors");
require("./src/db/mongoose");
const usersRouter = require("./src/routers/users");
const schoolRouter = require("./src/routers/school");
const substituteRouter = require("./src/routers/substitute");
const { isAuthenticated } = require("./src/shared/middlewares/middlewares");

/* 
todo:
1.notifications
2.send mail
3.images
4.update profile
*/

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(usersRouter);
app.use(isAuthenticated);
app.use(substituteRouter);
app.use(schoolRouter);

app.get("/", (req, res) => {
  res.send({ message: "Hello from server!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
