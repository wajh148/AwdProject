const userDB = require("../models/users/usermodel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const userAuthenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const verifyToken = jwt.verify(token, SECRET_KEY);

    const rootUser = await userDB.findOne({ _id: verifyToken._id });

    if (!rootUser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res.status(401).json({ error: "please login first" });
  }
};

module.exports = userAuthenticate;
