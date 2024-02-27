const jwt = require("jsonwebtoken");
const {
  secretKey: { SECRET_KEY, EXPIRES_IN },
} = require("../conf/config");

const checkVerifiedToken = (values) => {
  return new Promise((resolve, reject) => {
    try {
      const [token] = values;
      console.log("t2: ", token);

      if (!token) {
        resolve({
          responseCode: 400,
          message: "Token is missing.",
        });
      }

      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          resolve({
            responseCode: 400,
            message: "Invalid or expired token.",
          });
        }

        // Token is valid, you can access decoded.email
        resolve({
          responseCode: 200,
          message: "Token is valid.",
          email: decoded.email,
        });
      });
    } catch (error) {
      resolve({
        responseCode: 500,
        message: "Internal Server Error",
      });
    }
  });
};

module.exports = { checkVerifiedToken };
