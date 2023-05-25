import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
  selectUserRole,
} from "../../redux/features/auth/authSlice";

/* --------------------- ShowOnLogin -------------------- */
export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <> {children}</>;
  } else {
    return null;
  }
};

/* -------------------- ShowOnLogout -------------------- */
export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <> {children}</>;
  } else {
    return null;
  }
};

/* -------------------- ShowOnLogout -------------------- */
export const AdminLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);


  if (isLoggedIn && user?.role === "admin") {
    return <> {children}</>;
  } else {
    return null;
  }
};
