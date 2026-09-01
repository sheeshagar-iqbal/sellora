const jwt = require("jsonwebtoken");
const Errorhandler = require("../utils/Errorhandler");

const auth = async (req, res, next) => {
  try {
    // 1. Get token from Authorization header

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new Errorhandler("Please login first", 401)
      );
    }

    // 2. Extract token

    const token = authHeader.split(" ")[1];

    // 3. Verify token

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 4. Store decoded user information

    req.user = decoded;

    // 5. Continue to next controller

    next();

  } catch (error) {
    return next(
      new Errorhandler("Invalid or expired token", 401)
    );
  }
};

module.exports = auth;