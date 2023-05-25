import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrInsecure } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  RESET,
  loginWithCode,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
/* ------------------------------------------------------ */

// loginWithCode ( two factor authentication)
const LoginWithCode = () => {
  const { email } = useParams();

  //  useState
  const [loginCode, setLoginCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const loginUserWithCode = async (e) => {
    e.preventDefault();
    if (loginCode === "") {
      return toast.error("Please fill in the login code");
    }

    if (loginCode.length !== 6) {
      return toast.error("Access code must be 6 characters");
    }

    const code = {
      loginCode,
    };

    await dispatch(loginWithCode({ code, email }));
  };

  const sendUserLoginCode = async (e) => {
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  //  useEffect 1
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
      dispatch(RESET());
    }
  }, [isSuccess, isLoggedIn, navigate, dispatch]);

  //    reutrn method

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <GrInsecure size={35} color="#999" />
          </div>

          <h2>Enter Access Code</h2>

          <form onSubmit={loginUserWithCode}>
            <input
              type="text"
              placeholder="Access Code"
              required
              name="loginCode"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Processed To Login
            </button>

            <span className="--flex-center">
              Check your email for login access code
            </span>

            <div className={styles.links}>
              <p>
                <Link to="/">Home</Link>
              </p>

              <p onClick={sendUserLoginCode} className="v-link ">
                <b className="--color-primary " style={{ cursor: "pointer" }}>
                  Resend Code
                </b>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LoginWithCode;
