const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/task-manager-api";
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(url, options);
