// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '365d',
  });
};

module.exports = generateToken;
