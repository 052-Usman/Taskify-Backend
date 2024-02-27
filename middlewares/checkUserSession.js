const jwt = require("jsonwebtoken");
const {
  secretKey: { SECRET_KEY, EXPIRES_IN },
} = require("../conf/config");

const verifyUserToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    const errorAcces = {
      responseCode: 401,
      message: "Access denied. Token not provided.",
    };
    return res.json(errorAcces);
  }

  try {
    // Verify the token and check expiration
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    const currentTimestamp = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTimestamp) {
      const errorExpire = {
        responseCode: 401,
        message: "Token has expired.",
      };
      return res.json(errorExpire);
    }

    // Attach the decoded admin data to the request for further use
    req.userID = decoded.id;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    const errorInvalid = {
      responseCode: 401,
      message: error.message,
    };
    return res.json(errorInvalid);
  }
};

module.exports = { verifyUserToken };
