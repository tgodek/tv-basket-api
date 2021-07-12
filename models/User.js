const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Firstname required"],
    trim: true,
  },
  surname: {
    type: String,
    required: [true, "Lastname required"],
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    minlength: [6, "Email is too short"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Enter a valid email address",
    ],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username required"],
    minlength: [4, "Username is too short"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
    trim: true,
  },
  trackedMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  trackedShows: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
    },
  ],
  trackedEpisodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
    },
  ],
  tokenVersion: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
