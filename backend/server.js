const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const colors = require('colors');  
const path = require('path');


const noteRoutes = require('./Routes/noteRoutes.js');
const userRoutes = require('./Routes/UserRoutes');
const {notFound , errorHandler} = require('./Middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// --------------------------deployment------------------------------
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares

app.get("/", (req, res) => {
       res.send("API is running..");
});


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
