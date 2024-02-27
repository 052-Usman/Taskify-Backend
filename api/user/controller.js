const userService = require("./services");

const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const values = [name, email, password];

    const result = await userService.userSignUp(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const values = [email, password];

    const result = await userService.userLogin(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const userSignUpWithAuth = async (req, res) => {
  try {
    const { name, email, google_id } = req.body;
    const values = [name, email, google_id];

    const result = await userService.userSignUpWithAuth(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const userLoginWithAuth = async (req, res) => {
  try {
    const { email, google_id } = req.body;
    const values = [email, google_id];

    const result = await userService.userLoginWithAuth(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const values = [email];

    const result = await userService.getUserByEmail(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const updateUserName = async (req, res) => {
  try {
    const { name, email } = req.body;
    const values = [name, email];

    const result = await userService.updateUserName(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { id, old_password, new_password } = req.body;
    const values = [id, old_password, new_password];

    const result = await userService.updateUserPassword(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    console.log(error);
    return res.json({
      message: error.message,
    });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const { email } = req.body;
    const values = [email];

    const result = await userService.deleteUserAccount(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const forceEmailVerified = async (req, res) => {
  try {
    const { email } = req.body;
    const values = [email];

    const result = await userService.forceEmailVerified(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const values = [token];
    console.log("RS", token);

    const result = await userService.verifyEmail(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

// Task performed by user

const addTaskWithSpecificUser = async (req, res) => {
  try {
    const { user_id, title, description, due_date, category_name } = req.body;
    const values = [user_id, title, description, due_date, category_name];

    const result = await userService.addTaskWithSpecificUser(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const updateTaskWithID = async (req, res) => {
  try {
    const { task_id, user_id, title, description, due_date, category_name } =
      req.body;
    const values = [
      task_id,
      user_id,
      title,
      description,
      due_date,
      category_name,
    ];

    const result = await userService.updateTaskWithID(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const getAllTasksByUser = async (req, res) => {
  try {
    const { user_id } = req.body;
    const values = [user_id];

    const result = await userService.getAllTasksByUser(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const getTaskWithID = async (req, res) => {
  try {
    const { task_id } = req.body;
    const values = [task_id];

    const result = await userService.getTaskWithID(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const getTaskByCategoryWithUserID = async (req, res) => {
  try {
    const { user_id, category_name } = req.body;
    const values = [user_id, category_name];

    const result = await userService.getTaskByCategoryWithUserID(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
  }
};

const deleteTaskWithID = async (req, res) => {
  try {
    const { user_id, task_id } = req.body;
    const values = [user_id, task_id];

    const result = await userService.deleteTaskWithID(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: error.message,
    });
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
