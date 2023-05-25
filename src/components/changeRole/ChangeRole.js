import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  getUsers,
  logout,
  upgradeUser,
} from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { sendAutomatedEmail } from "../../redux/features/email/emailSlice";
import { EMAIL_RESET } from "../../redux/features/email/emailSlice";
/* ------------------------------------------------------ */
// ChangeRole
const ChangeRole = ({ id, email }) => {
  const [userRole, setUserRole] = useState("");
  const dispatch = useDispatch();

  const changeRule = async (e) => {
    e.preventDefault();
    if (!userRole) {
      toast.error("please select a role");
    }

    const userData = {
      role: userRole,
      id: id,
    };

    const emailData = {
      subject: "Account Role Changed - AUTH:Z",
      send_to: email,
      reply_to: "no_reply@gmail.com",
      template: "changeRole",
      url: "/login",
    };

    await dispatch(upgradeUser(userData));
    await dispatch(sendAutomatedEmail(emailData));

    await dispatch(getUsers());
    await dispatch(EMAIL_RESET());
  };

  return (
    <div className="sort">
      <form className="--flex-start" onSubmit={changeRule}>
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="">-- select --</option>
          <option value="subscriber">Subscriber</option>
          <option value="admin">Admin</option>
          <option value="author">Author</option>
          <option value="admin">Admin</option>
          <option value="suspended">Suspended</option>
        </select>

        <button className="--btn --btn-primary" type="submit">
          <FaCheck size={15} />
        </button>
      </form>
    </div>
  );
};

export default ChangeRole;
