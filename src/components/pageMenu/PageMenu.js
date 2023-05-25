import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminLink } from "../protect/hiddenLink";
import { useDispatch } from "react-redux";
import { RESET, logout } from "../../redux/features/auth/authSlice";
/* ------------------------------------------------------ */

const PageMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <nav className="--btn-google --p --mb">
        <ul className="home-links">
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>

          <li>
            <NavLink to="/changePassword">Change Password</NavLink>
          </li>

          <AdminLink>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
          </AdminLink>

          <li>
            <button className="--btn --btn-secondary" onClick={logoutUser}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PageMenu;
