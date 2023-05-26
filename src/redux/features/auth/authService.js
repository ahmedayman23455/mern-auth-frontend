import axios from "axios";

/* ------------------------------------------------------ */

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

/* ------------------------------------------------------ */
// Validate email

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

/* -------------------- registerUser -------------------- */

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

/* ------------------------ login ----------------------- */

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData) ;
  return response.data;
};

/* ----------------------- logout ----------------------- */

const logOut = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

/* ----------------------- logint status ----------------------- */

const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");
  return response.data;
};

/* ------------------- getUser ------------------- */

const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};
/* ------------------- updateUser ------------------- */

const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

/* ---------------- sendVerificationEmail ---------------- */

const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendVerificationEmail");

  return response.data.message;
};

/* --------------------- verifyUser --------------------- */

const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );
  return response.data.message;
};

/* ------------------- chantePassword ------------------- */

const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);
  return response.data.message;
};

/* ------------------- forgotPassword ------------------- */

const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);
  return response.data.message;
};

/* ------------------- resetPassword ------------------- */

const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );
  return response.data.message;
};

/* ------------------- getUsers ------------------- */

const getUsers = async () => {
  const response = await axios.get(API_URL + "getUsers");
  return response.data;
};

/* ------------------- deleteUser ------------------- */

const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`);
  return response.data.message;
};

/* ------------------- upgradeUser ------------------- */

const upgradeUser = async (userData) => {
  const response = await axios.patch(API_URL + "upgradeUser", userData);
  return response.data.message;
};

/* -------------------- sendLoginCode ------------------- */

const sendLoginCode = async (email) => {
  const response = await axios.post(`${API_URL}/sendLoginCode/${email}`);
  return response.data.message;
};

/* -------------------- loginWithCode ------------------- */

const loginWithCode = async (email, code) => {
  const response = await axios.post(`${API_URL}logitWithCode/${email}`, code);
  return response.data;
};

const loginWithGoogle = async (userToken) => {
  const response = await axios.post(API_URL + "google/callback", userToken);
  return response.data;
};

/* ------------------------------------------------------ */
const authService = {
  register,
  login,
  logOut,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
};

export default authService;
