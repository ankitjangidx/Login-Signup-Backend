const express = require("express");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const DB = require("./config/database");
DB();

app.use(express.json());

const cookieParser = require("cookie-parser")
app.use(cookieParser());

const userRouter = require("./routes/user");

app.use("/api/v1",userRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
