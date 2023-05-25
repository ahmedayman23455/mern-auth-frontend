import React from "react";
import "./Header.scss";
import { BiLogOut } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RESET, logout } from "../../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import { UserName } from "../../pages/profile/UserProfile";

/* ------------------------------------------------------ */
const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    await dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <nav>
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <BiLogOut size={35} />
          <span>Auth:z</span>
        </div>

        <ul className="home-links">
          <ShowOnLogin>
            <li className="--flex-center">
              <FaUserCircle size={20} />
              <UserName />
            </li>
          </ShowOnLogin>

          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>

          <ShowOnLogin>
            <li>
              <NavLink to="/profile" className={activeLink}>
                Profile
              </NavLink>
            </li>

            <li>
              <button className="--btn --btn-secondary" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
