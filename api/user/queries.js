module.exports.userSignUp = () => {
  return `SELECT * FROM public.signup_user($1,$2,$3)`;
};

module.exports.userLogin = () => {
  return `SELECT * FROM public.login_user($1)`;
};

module.exports.getUserByEmail = () => {
  return `SELECT * FROM public.get_user_by_email($1)`;
};

module.exports.getUserById = () => {
  return `SELECT * FROM public.get_user_by_id($1)`;
};

module.exports.userSignUpWithAuth = () => {
  return `SELECT * FROM public.signup_user_with_auth($1,$2,$3)`;
};

module.exports.userLoginWithAuth = () => {
  return `SELECT * FROM public.login_user_with_auth($1,$2)`;
};

module.exports.updateUserName = () => {
  return `SELECT * FROM public.update_user_name_by_email($1,$2)`;
};

module.exports.updateUserPassword = () => {
  return `SELECT * FROM public.update_user_password_by_id($1,$2)`;
};

module.exports.deleteUserAccount = () => {
  return `SELECT * FROM public.delete_user_acc_by_user($1)`;
};

module.exports.forceEmailVerified = () => {
  return `SELECT * FROM public.force_verify_user($1)`;
};

// Task performed by user

module.exports.addTaskWithSpecificUser = () => {
  return `SELECT * FROM public.add_task_specific_user($1,$2,$3,$4,$5)`;
};

module.exports.updateTaskWithID = () => {
  return `SELECT * FROM public.update_task_by_id($1,$2,$3,$4,$5,$6)`;
};

module.exports.getTaskByIdAndUserId = () => {
  return `SELECT * FROM public.get_task_by_id_and_user_id($1,$2)`;
};

module.exports.getAllTasksByUser = () => {
  return `SELECT * FROM public.get_all_tasks_with_user_id($1)`;
};

module.exports.getTaskWithID = () => {
  return `SELECT * FROM public.get_task_by_id($1)`;
};

module.exports.deleteTaskWithID = () => {
  return `SELECT * FROM public.delete_task_by_id($1,$2)`;
};

module.exports.getTaskByCategoryWithUserID = () => {
  return `SELECT * FROM public.get_task_by_category_with_user_id($1,$2)`;
};
