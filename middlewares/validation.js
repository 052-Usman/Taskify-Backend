const Joi = require("joi");

// for user validation
const userSignUp = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const userLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const userSignUpWithAuth = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    google_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const userLoginWithAuth = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    google_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const getUserByEmailValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const updateUserNameValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const updateUserPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    old_password: Joi.string().required(),
    new_password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const deleteUserAccountValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const forceEmailVerifiedValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const verifyEmailValidate = (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }
  next();
};

// Task performed by user
const addTaskWithSpecificUser = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    due_date: Joi.date().required(),
    category_name: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const updateTaskWithID = (req, res, next) => {
  const schema = Joi.object({
    task_id: Joi.number().required(),
    user_id: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    due_date: Joi.date().required(),
    category_name: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const getAllTasksByUser = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const getTaskWithID = (req, res, next) => {
  const schema = Joi.object({
    task_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const deleteTaskWithID = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    task_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

const getTaskByCategoryWithUserID = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    category_name: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      responseCode: 400,
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = {
  userSignUp,
  userLogin,
  userSignUpWithAuth,
  userLoginWithAuth,
  getUserByEmailValidation,
  updateUserNameValidation,
  updateUserPasswordValidation,
  deleteUserAccountValidation,
  forceEmailVerifiedValidation,
  verifyEmailValidate,
  addTaskWithSpecificUser,
  updateTaskWithID,
  getAllTasksByUser,
  getTaskWithID,
  deleteTaskWithID,
  getTaskByCategoryWithUserID,
};
