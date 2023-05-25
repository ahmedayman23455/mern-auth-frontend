import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import LoginWithCode from "./pages/auth/LoginWithCode";
import Verify from "./pages/auth/Verify";
import UserProfile from "./pages/profile/UserProfile";
import ChangePassword from "./pages/changePassword/ChangePassword";
import UserList from "./pages/userList/UserList";
import Loader from "./components/loader/Loader";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET,
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";

import { GoogleOAuthProvider } from "@react-oauth/google";

/* 
   we will give axios a default setting that will enable it to receive credentials from the backend 
   ( Anyway we use axios , we enable axios to get the user credentials and we are sending token from the backend  )
*/
axios.defaults.withCredentials = true;

/* ------------------------------------------------------ */
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const { isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user, isLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          {/* <Loader/> */}
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/resetPassword/:resetToken" element={<Reset />} />
            <Route path="/loginWithCode/:email" element={<LoginWithCode />} />

            <Route
              path="/verify/:verificationToken"
              element={
                <Layout>
                  <Verify />
                </Layout>
              }
            />

            <Route
              path="/profile"
              element={
                <Layout>
                  <UserProfile />
                </Layout>
              }
            />

            <Route
              path="/changePassword"
              element={
                <Layout>
                  <ChangePassword />
                </Layout>
              }
            />

            <Route
              path="/users"
              element={
                <Layout>
                  <UserList />
                </Layout>
              }
            />

            <Route path="/Loader" element={<Loader />} />
          </Routes>
        </GoogleOAuthProvider>
        ;
      </BrowserRouter>
    </>
  );
}

export default App;
