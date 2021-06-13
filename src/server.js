const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/usersRoute");
const { port, logger } = require("./utils/port");

const app = express();
app.use(cors());
app.use(express.json());

// register routes
app.use("/api/v1/users", usersRouter);

app.listen(port, logger);
