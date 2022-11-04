// import mongoose from "mongoose";
const mongoose = require("mongoose")
// import dotenv from "dotenv";
const dotenv = require("dotenv");
// import colors from "colors";
const colors = require("colors");
// import users from "./data/users.js";
const users = require('./data/users.js');
// import notes from "./data/notes.js";
const notes = require('./data/notes.js');
// import User from "./models/userModel.js";
const User = require('./models/userModel.js');
// import Note from "./models/noteModel.js";
const Note = require('./models/noteModel.js')
// import connectDB from "./config/db.js";
const connectDB = require('./config/db.js')

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Note.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleNotes = notes.map((note) => {
      return { ...note, user: adminUser };
    });

    await Note.insertMany(sampleNotes);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Note.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
