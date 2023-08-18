const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  watchlist: [
    {
      adult: { type: Boolean },
      backdrop_path: { type: String },
      genre_ids: { type: Array },
      id: { type: Number },
      original_language: { type: String },
      original_title: { type: String },
      overview: { type: String },
      popularity: { type: Number },
      poster_path: { type: String },
      release_date: { type: String },
      title: { type: String },
      video: { type: Boolean },
      vote_average: { type: Number },
      vote_count: { type: Number },
    },
  ],
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
