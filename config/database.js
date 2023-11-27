const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
//   const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

  mongoose.connect(process.env.DATABASE_URL);

  mongoose.connection.on("connected", () => {
    console.log("Connected to database successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error connecting to database ", err);
  });
};

module.exports = dbConnect;
