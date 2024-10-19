require("dotenv").config();
const express = require("express");
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("morgan")("dev"));
app.use(require("cors")());
app.use(require("./routes"));
app.use(require("./helper/handles").errorHandler);

app.listen(process.env.PORT, () => {
  require("./db");
  console.log(`Server on: http://localhost:${process.env.PORT}`);
  return;
});
