const express = require("express");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const database = require("./config/database");

app.use(
  cors({
    origin: ["http://localhost:3001"],
  })
);

database.connection();

app.use(express.json());
app.use(cookieParser());
//home route
app.get("/", (_, res) => {
  res.send("TV Basket home page");
});

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
