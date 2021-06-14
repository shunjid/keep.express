const mongoose = require("mongoose");

const base = "mongodb://127.0.0.1:27017";
const dbName = "practice-keep-api";

const url = `${base}/${dbName}`;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(url, options);
