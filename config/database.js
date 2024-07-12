const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = async () => {
  // Connecting to the database
  try {
    mongoose.set('strictQuery', true);
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("database connection failed. exiting now...");
    console.error(error);
  }
};