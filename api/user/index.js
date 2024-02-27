var express = require("express");
var router = express.Router();
const middlewares = require("../../middlewares/validation");
const userController = require("./controller");
const { verifyUserToken } = require("../../middlewares/checkUserSession");

router.post("/signup/", middlewares.userSignUp, userController.userSignUp);

router.post("/login/", middlewares.userLogin, userController.userLogin);

router.post(
  "/signup-google/",
  middlewares.userSignUpWithAuth,
  userController.userSignUpWithAuth
);

router.post(
  "/login-google/",
  middlewares.userLoginWithAuth,
  userController.userLoginWithAuth
);

router.get(
  "/user-information/",
  verifyUserToken,
  middlewares.getUserByEmailValidation,
  userController.getUserByEmail
);

router.post(
  "/update-user-name/",
  verifyUserToken,
  middlewares.updateUserNameValidation,
  userController.updateUserName
);

router.post(
  "/update-user-password/",
  verifyUserToken,
  middlewares.updateUserPasswordValidation,
  userController.updateUserPassword
);

router.delete(
  "/delete-user/",
  verifyUserToken,
  middlewares.deleteUserAccountValidation,
  userController.deleteUserAccount
);

router.post(
  "/verify-email/",
  verifyUserToken,
  middlewares.forceEmailVerifiedValidation,
  userController.forceEmailVerified
);

router.get(
  "/verify-email-auth/",
  middlewares.verifyEmailValidate,
  userController.verifyEmail
);

// Task performed by user

router.post(
  "/add-task/",
  verifyUserToken,
  middlewares.addTaskWithSpecificUser,
  userController.addTaskWithSpecificUser
);

router.post(
  "/update-task/",
  verifyUserToken,
  middlewares.updateTaskWithID,
  userController.updateTaskWithID
);

router.get(
  "/get-all-tasks/",
  verifyUserToken,
  middlewares.getAllTasksByUser,
  userController.getAllTasksByUser
);

router.get(
  "/get-one-task/",
  verifyUserToken,
  middlewares.getTaskWithID,
  userController.getTaskWithID
);

router.get(
  "/get-task-user-category/",
  verifyUserToken,
  middlewares.getTaskByCategoryWithUserID,
  userController.getTaskByCategoryWithUserID
);

router.delete(
  "/delete-task/",
  verifyUserToken,
  middlewares.deleteTaskWithID,
  userController.deleteTaskWithID
);

module.exports = router;
