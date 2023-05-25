import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import "./ChangePassword.scss";
import profileImg from "../../assets/avatarr.png";
import PageMenu from "../../components/pageMenu/PageMenu";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import useRedirectLoggedOutUser from "./../../customHooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  RESET,
  changePassword,
  logout,
} from "../../redux/features/auth/authSlice";
import { Spinner } from "../../components/loader/Loader";
import {
  EMAIL_RESET,
  sendAutomatedEmail,
} from "../../redux/features/email/emailSlice";

/* ------------------------------------------------------ */
const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

// UserProfile component
const ChangePassword = () => {
  useRedirectLoggedOutUser("/login");

  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const [emailContent, setEmailContent] = useState({});

  useEffect(() => {
    if (
      isSuccess &&
      message.trim() === "Password change successfully, please re-login"
    ) {
      dispatch(sendAutomatedEmail(emailContent));
      dispatch(logout());
      dispatch(RESET());
      dispatch(EMAIL_RESET());
      navigate("/login");
    }
  }, [isSuccess, dispatch, navigate, message]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !password2) {
      return toast.error("All fields are required");
    }

    if (password !== password2) {
      return toast.error("passwords do not match");
    }

    const userData = {
      oldPassword,
      password,
    };

    const emailData = {
      subject: "Password Changed - AUTH:Z",
      send_to: user.email,
      reply_to: "no_reply@gmail.com",
      template: "changePassword",
      url: "/forgot",
    };

    setEmailContent(emailData);
    await dispatch(changePassword(userData));
  };

  return (
    <section>
      <div className="container">
        <PageMenu />
        <h2>ChangePassword</h2>

        <div className="--flex-start profile --flex-start change-password">
          <Card cardClass={"card"}>
            <form onSubmit={updatePassword}>
              <p>
                <label> Current Password : </label>

                <PasswordInput
                  placeholder="Old Password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleInputChange}
                />
              </p>

              <p>
                <label> New Password : </label>
                <PasswordInput
                  placeholder="New Password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
              </p>

              <p>
                <label> Confirm New Password : </label>
                <PasswordInput
                  placeholder="Confirm New Password"
                  name="password2"
                  value={password2}
                  onChange={handleInputChange}
                />
              </p>

              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="--btn --btn-danger --btn-block"
                >
                  Change Password
                </button>
              )}
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
