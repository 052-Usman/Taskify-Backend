const config = {
  dbConfigurations: {
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PORT: process.env.DB_PORT,
  },
  secretKey: {
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRES_IN: process.env.EXPIRES_IN,
  },
  sendEmail: {
    emailId: process.env.EMAIL_ID,
    emailPassword: process.env.EMAIL_PASSWORD,
    apiKey: process.env.API_LINK,
  },
};

module.exports = config;
