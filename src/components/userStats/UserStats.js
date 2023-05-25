import React, { useEffect, useState } from "react";
import { BiUserCheck, BiUserMinus, BiUserX } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import "./UsersStats.scss";
import InfoBox from "../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_SUSPENDED_USERS,
  CALC_VERIFIED_USERS,
} from "../../redux/features/auth/authSlice";
/* ------------------------------------------------------ */
// Icons
const icon1 = <FaUsers size={40} color="#fff" />;
const icon2 = <BiUserCheck size={40} color="#fff" />;
const icon3 = <BiUserMinus size={40} color="#fff" />;
const icon4 = <BiUserX size={40} color="#fff" />;

const UserStats = () => {
  const { users, verifiedUsers, suspendedUsers } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fun = async () => {
      await dispatch(CALC_VERIFIED_USERS());
      await dispatch(CALC_SUSPENDED_USERS());
    };
    fun();
  }, [dispatch, users]);

  return (
    <div className="user-summary">
      <h3 className="--mt">User Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={icon1}
          title={"Total Users"}
          count={users.length}
          //  count={users.length}
          bgColor="card1"
        />
        <InfoBox
          icon={icon2}
          title={"Verified Users"}
          count={verifiedUsers}
          //  count={verifiedUsers}
          bgColor="card2"
        />
        <InfoBox
          icon={icon3}
          title={"Unverified Users"}
          count={users.length - verifiedUsers}
          //  count={unverifiedUsers}
          bgColor="card3"
        />
        <InfoBox
          icon={icon4}
          title={"Suspended Users"}
          count={suspendedUsers}
          //  count={suspendedUsers}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default UserStats;
