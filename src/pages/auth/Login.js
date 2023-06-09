import React, { useState, useEffect } from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";
import {
  RESET,
  login,
  loginWithGoogle,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

import { GoogleLogin } from "@react-oauth/google";
/* ------------------------------------------------------ */

const initialState = {
  email: "",
  password: "",
};

//  Login Component
const Login = () => {
  //  useState
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    isLoggedIn,
    isSuccess,
    user,
    message,
    twoFactor,
    isError,
  } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    await dispatch(login(userData));
  };

  const googleLogin = async (credentialResponse) => {
    const { credential } = credentialResponse;

    await dispatch(loginWithGoogle(credential));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
      dispatch(RESET());
    }

    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }
  }, [isSuccess, isLoggedIn, navigate, dispatch, isError, twoFactor, email]);

  //  reutrn method

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>

          <GoogleLogin
            onSuccess={googleLogin}
            onError={() => {
              toast.error("Login Failed");
            }}
          />

          <br />
          <p className="--text-center --fw-bold">or</p>
          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />

            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <Link to="/forgot">Forgot Password</Link>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
