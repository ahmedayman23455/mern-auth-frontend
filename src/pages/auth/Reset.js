import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { MdPassword } from "react-icons/md";
import { RESET, resetPassword } from "./../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
/* ------------------------------------------------------ */

const initialState = {
  password: "",
  password2: "",
};

//  Reset Component

const Reset = () => {
  //  useState
  const { resetToken } = useParams();
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { isLoading, isSuccess, message } = useSelector((state) => state.auth);
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(true);
  const [sChar, setSChar] = useState(true);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check for PASSWORD LENGTH
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    } else {
      return timesIcon;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (!password || !password2) {
      return toast.error("All fields are required");
    }

    if (!(uCase && num && sChar && passLength)) {
      return toast.error("Please Follow the password credentials");
    }

    if (password !== password2) {
      return toast.error("passwords do not match");
    }

    const userData = {
      password,
      resetToken,
    };

    await dispatch(resetPassword(userData));
  };

  useEffect(() => {
    if (
      isSuccess &&
      message.trim() === "Password Reset Successful, please login"
    ) {
      dispatch(RESET());
      navigate("/login");
    }
  }, [isSuccess, dispatch, navigate, message]);

  //    return method

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>

          <h2>Reset Password</h2>

          <form onSubmit={reset}>
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />

            <PasswordInput
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />

            {/* password strength */}

            <Card cardClass={styles.group}>
              <ul className="form-list">
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(uCase)}
                    &nbsp; Lowercase & uppercase
                  </span>
                </li>

                <li>
                  <span className={styles.indicator}>
                    {switchIcon(num)}
                    &nbsp; Number(0-9)
                  </span>
                </li>

                <li>
                  <span className={styles.indicator}>
                    {switchIcon(sChar)}
                    &nbsp; Special Character(!@#$%^&*)
                  </span>
                </li>

                <li>
                  <span className={styles.indicator}>
                    {switchIcon(passLength)}
                    &nbsp; At least 6 character
                  </span>
                </li>
              </ul>
            </Card>

            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>

            <div className={styles.links}>
              <p>
                <Link to="/">Home</Link>
              </p>

              <p>
                <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
