const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
     // required: true,
      //unique: true,
    },
    geoLocation: {
      long: { type: String },
      lat: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", postSchema);
