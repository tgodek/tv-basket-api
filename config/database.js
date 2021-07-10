const mongoose = require("mongoose");

module.exports.connection = () => {
  mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  var db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to DB");
  });

  db.on("error", console.error.bind(console, "Error connecting to database"));
};
