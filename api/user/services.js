const { query } = require("../../utils/db");
const queries = require("./queries");
const {
  secretKey: { SECRET_KEY, EXPIRES_IN },
  sendEmail: { emailId, emailPassword, apiKey },
} = require("../../conf/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const { checkVerifiedToken } = require("../../middlewares/checkVerifiedToken");

const userSignUp = async (values) => {
  try {
    const [name, email, password] = values;

    // Check if user with the same email already exists
    const existingUser = await query(queries.getUserByEmail(), [email]);
    if (existingUser.rows[0]) {
      const result = {
        responseCode: 400,
        message: "User with the same email already exists.",
      };
      return result;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await query(queries.userSignUp(), [
      name,
      email,
      hashedPassword,
    ]);

    if (Object.keys(rows).length) {
      const sendEmail = await sendVerificationEmail(values);
      console.log("Sent Email successfully");

      const result = {
        responseCode: 201,
        message: "User signed up successfully",
      };
      return result;
    } else {
      // Failed to sign up user
      const result = {
        responseCode: 500,
        message: "Failed to sign up user",
      };
      return result;
    }
  } catch (error) {
    const result = {
      responseCode: 500,
      message: error.message,
    };
    return result;
  }
};

const userLogin = async (values) => {
  try {
    const [email, password] = values;

    const { rows } = await query(queries.userLogin(), [email]);
    if (Object.keys(rows).length) {
      const user = rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        // Create a token with an expiry time (60m)
        const token = jwt.sign(user, SECRET_KEY, {
          expiresIn: EXPIRES_IN,
        });

        // Calculate the exact date and time when the token will expire
        const expiresAt = moment().add(60, "m").toISOString();

        const result = {
          responseCode: 200,
          message: "Login successful",
          user: { ...user, password: undefined },
          token: token,
          expiry: expiresAt,
        };
        return result;
      } else {
        // Password doesn't match
        const result = {
          responseCode: 401,
          message: "Incorrect password",
        };
        return result;
      }
    } else {
      // User Doesn't exist
      const result = {
        responseCode: 404,
        message: "User Doesn't exist",
      };
      return result;
    }
  } catch (error) {
    const result = {
      responseCode: 500,
      message: error.message,
    };
    return result;
  }
};

const userSignUpWithAuth = async (values) => {
  try {
    const [name, email, google_id] = values;

    // Check if user with the same email already exists
    const existingUser = await query(queries.getUserByEmail(), [email]);
    if (existingUser.rows[0]) {
      const result = {
        responseCode: 400,
        message: "User with the same email already exists.",
      };
      return result;
    }

    const { rows } = await query(queries.userSignUpWithAuth(), [
      name,
      email,
      google_id,
    ]);

    if (Object.keys(rows).length) {
      const result = {
        responseCode: 201,
        message: "User signed up successfully with Google",
      };
      return result;
    } else {
      // Failed to sign up user
      const result = {
        responseCode: 500,
        message: "Failed to sign up user with Google",
      };
      return result;
    }
  } catch (error) {
    const result = {
      responseCode: 500,
      message: error.message,
    };
    return result;
  }
};

const userLoginWithAuth = async (values) => {
  try {
    const [email, google_id] = values;

    const { rows } = await query(queries.userLoginWithAuth(), values);
    if (Object.keys(rows).length) {
      const user = rows[0];

      // Create a token with an expiry time (60m)
      const token = jwt.sign(user, SECRET_KEY, {
        expiresIn: EXPIRES_IN,
      });

      // Calculate the exact date and time when the token will expire
      const expiresAt = moment().add(60, "m").toISOString();

      const result = {
        responseCode: 200,
        message: "Login successful",
        user: user,
        token: token,
        expiry: expiresAt,
      };
      return result;
    } else {
      // User Doesn't exist
      const result = {
        responseCode: 404,
        message: "User Doesn't exist",
      };
      return result;
    }
  } catch (error) {
    const result = {
      responseCode: 500,
      message: error.message,
    };
    return result;
  }
};

const getUserByEmail = async (values) => {
  try {
    const [email] = values;

    const { rows } = await query(queries.getUserByEmail(), [email]);
    if (Object.keys(rows).length) {
      const user = rows[0];

      const result = {
        responseCode: 200,
        message: "User Information retrieved",
        user: { ...user, password: undefined },
      };
      return result;
    } else {
      // User Doesn't exist
      const result = {
        responseCode: 404,
        message: "User Doesn't exist",
      };
      return result;
    }
  } catch (error) {
    const result = {
      responseCode: 500,
      message: error.message,
    };
    return result;
  }
};

const updateUserName = async (values) => {
  try {
    const [name, email] = values;

    const { rows } = await query(queries.userLogin(), [email]);
    if (Object.keys(rows).length) {
      // User exists, proceed with updating the name
      await query(queries.updateUserName(), values);

      const result = {
        responseCode: 200,
        message: "User name updated successfully",
      };
      return result;
    } else {
      // User Doesn't exist
      const result = {
        responseCode: 404,
        message: "User Doesn't exist",
      };
      return result;
    }
  } catch (error) {
    const result = {
      responseCode: 500,
      message: error.message,
    };
    return result;
  }
};

const updateUserPassword = async (values) => {
  try {
    const [id, old_password, new_password] = values;
    const hashedPassword = await bcrypt.hash(new_password, 10);

    const existingUser = await query(queries.getUserById(), [id]);
    if (!existingUser.rows[0]) {
      const result = {
        responseCode: 400,
        message: "User does not exist",
      };
      return result;
    }

    // Check if the old password matches
    const userPassword = existingUser.rows[0].password;
    const isPasswordMatch = await bcrypt.compare(old_password, userPassword);

    if (isPasswordMatch) {
      // Update the password
      const { rows } = await query(queries.updateUserPassword(), [
        id,
        hashedPassword,
      ]);
      if (Object.keys(rows).length) {
        const result = {
          responseCode: 200,
          message: "Password updated successfully",
        };
        return result;
      }
    } else {
      const result = {
        responseCode: 401,
        message: "Incorrect old password",
      };
      return result;
    }
  } catch (error) {
    const result = {
      responseCode: 500,
      message: error.message,
    };
    return result;
  }
};

const deleteUserAccount = async (values) => {
  try {
    const [email] = values;

    const { rows } = await query(queries.userLogin(), values);
    if (Object.keys(rows).length) {
      // User exists, proceed with deleting use acc
      await query(queries.deleteUserAccount(), values);

      const result = {
        responseCode: 200,
        message: "User deleted successfully",
      };
      return result;
    } else {
      // User Doesn't exist
      const result = {
        responseCode: 404,
        message: "User Doesn't exist",
      };
      return result;
    }
  } catch (error) {
    const result = {
      responseCode: 500,
      message: error.message,
    };
    return result;
  }
};

const forceEmailVerified = async (values) => {
  try {
    const [email] = values;

    const { rows } = await query(queries.userLogin(), values);
    if (Object.keys(rows).length) {
      // User exists, proceed with updating the name
      await query(queries.forceEmailVerified(), values);

      const result = {
        responseCode: 200,
        message: "Email Verified successfully",
      };
      return result;
    } else {
      // User Doesn't exist
      const result = {
        responseCode: 404,
        message: "User Doesn't exist",
      };
      return result;
    }
  } catch (error) {
    const result = {
      responseCode: 500,
      message: error.message,
    };
    return result;
  }
};

const verifyEmail = async (values) => {
  try {
    const token_valid = await checkVerifiedToken(values);
    console.log(token_valid);
    if (token_valid.responseCode === 200) {
      const { rows } = await query(queries.forceEmailVerified(), [
        token_valid.email,
      ]);
      if (Object.keys(rows).length) {
        const result = {
          responseCode: 200,
          message: "Email Verified successfully",
        };
        return result;
      }
      return {
        responseCode: 500,
        message: "Something went wrong",
        response: token_valid.response,
      };
    } else {
      return token_valid;
    }
  } catch (error) {
    const result = {
      responseCode: 500,
      message: error.message,
    };
    return result;
  }
};

// Task performed by user
const addTaskWithSpecificUser = async (values) => {
  try {
    const [user_id, title, description, due_date, category_name] = values;

    // Check if the user exists
    const existingUser = await query(queries.getUserById(), [user_id]);
    if (!existingUser.rows[0]) {
      return {
        responseCode: 404,
        message: "User not found.",
      };
    }

    // Add the task
    const { rows } = await query(queries.addTaskWithSpecificUser(), values);

    if (Object.keys(rows).length) {
      return {
        responseCode: 201,
        message: "Task added successfully",
      };
    } else {
      // Failed to add task
      return {
        responseCode: 500,
        message: "Failed to add task",
      };
    }
  } catch (error) {
    return {
      responseCode: 500,
      message: error.message,
    };
  }
};

const updateTaskWithID = async (values) => {
  try {
    const [task_id, user_id, title, description, due_date, category_name] =
      values;

    // Check if the user exists
    const existingUser = await query(queries.getUserById(), [user_id]);
    if (!existingUser.rows[0]) {
      return {
        responseCode: 404,
        message: "User not found.",
      };
    }

    // Check if the task exists and belongs to the specified user
    const existingTask = await query(queries.getTaskByIdAndUserId(), [
      task_id,
      user_id,
    ]);
    if (!existingTask.rows[0]) {
      return {
        responseCode: 404,
        message: "Task not found or does not belong to the specified user.",
      };
    }

    // Update the task
    const { rows } = await query(queries.updateTaskWithID(), values);

    if (Object.keys(rows).length) {
      return {
        responseCode: 200,
        message: "Task updated successfully",
      };
    } else {
      // Failed to update task
      return {
        responseCode: 500,
        message: "Failed to update task",
      };
    }
  } catch (error) {
    return {
      responseCode: 500,
      message: error.message,
    };
  }
};

const getAllTasksByUser = async (values) => {
  try {
    const [user_id] = values;

    // Check if the user exists
    const existingUser = await query(queries.getUserById(), [user_id]);
    if (!existingUser.rows[0]) {
      return {
        responseCode: 404,
        message: "User not found.",
        tasks: [],
      };
    }

    // Get all tasks for the specified user
    const { rows } = await query(queries.getAllTasksByUser(), values);

    return {
      responseCode: 200,
      message: "Tasks retrieved successfully",
      tasks: rows,
    };
  } catch (error) {
    return {
      responseCode: 500,
      message: error.message,
      tasks: [],
    };
  }
};

const getTaskWithID = async (values) => {
  try {
    const [task_id] = values;

    // Get the task details
    const { rows } = await query(queries.getTaskWithID(), values);

    if (Object.keys(rows).length) {
      return {
        responseCode: 200,
        message: "Task retrieved successfully",
        task: rows[0],
      };
    } else {
      return {
        responseCode: 404,
        message: "Task not found",
        task: [],
      };
    }
  } catch (error) {
    return {
      responseCode: 500,
      message: error.message,
      task: null, // Return null for the task
    };
  }
};

const getTaskByCategoryWithUserID = async (values) => {
  try {
    const [user_id, category_name] = values;

    // Check if the user exists
    const existingUser = await query(queries.getUserById(), [user_id]);
    if (!existingUser.rows[0]) {
      return {
        responseCode: 404,
        message: "User not found.",
        tasks: [],
      };
    }

    // Get tasks for the specified user and category
    const { rows } = await query(queries.getTaskByCategoryWithUserID(), values);

    if (Object.keys(rows).length) {
      return {
        responseCode: 200,
        message: "Tasks retrieved successfully",
        tasks: rows,
      };
    } else {
      return {
        responseCode: 404,
        message: "No tasks found for the specified category",
        tasks: [],
      };
    }
  } catch (error) {
    return {
      responseCode: 500,
      message: error.message,
      tasks: [],
    };
  }
};

const deleteTaskWithID = async (values) => {
  try {
    const [user_id, task_id] = values;

    // Check if the user exists
    const existingUser = await query(queries.getUserById(), [user_id]);
    if (!existingUser.rows[0]) {
      return {
        responseCode: 404,
        message: "User not found.",
        tasks: [],
      };
    }

    // Check if the task exists and belongs to the specified user
    const existingTask = await query(queries.getTaskByIdAndUserId(), values);
    if (!existingTask.rows[0]) {
      return {
        responseCode: 404,
        message: "Task not found or does not belong to the specified user.",
      };
    }

    // Delete the task
    const { rowCount } = await query(queries.deleteTaskWithID(), values);

    if (rowCount > 0) {
      return {
        responseCode: 200,
        message: "Task deleted successfully",
      };
    } else {
      // Failed to delete task
      return {
        responseCode: 500,
        message: "Failed to delete task",
      };
    }
  } catch (error) {
    return {
      responseCode: 500,
      message: error.message,
    };
  }
};

// Function to generate a verification token
const generateVerificationToken = (email) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1d" });
};

// Function to send verification email
const sendVerificationEmail = async (values) => {
  try {
    const [name, email, password] = values;
    const verificationToken = generateVerificationToken(email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailId,
        pass: emailPassword,
      },
    });

    // Render the email template with user's name and verification link
    const verificationLink = `${apiKey}?token=${verificationToken}`;
    const emailTemplate = await ejs.renderFile(
      path.join(__dirname, "..", "..", "views", "emailVerification.ejs"),
      {
        userName: name,
        verificationLink,
      }
    );

    // Setup email data
    const mailOptions = {
      from: emailId,
      to: email,
      subject: "Email Verification",
      html: emailTemplate,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  userSignUp,
  userLogin,
  userSignUpWithAuth,
  userLoginWithAuth,
  getUserByEmail,
  updateUserName,
  updateUserPassword,
  deleteUserAccount,
  forceEmailVerified,
  verifyEmail,
  addTaskWithSpecificUser,
  updateTaskWithID,
  getAllTasksByUser,
  getTaskWithID,
  getTaskByCategoryWithUserID,
  deleteTaskWithID,
};
