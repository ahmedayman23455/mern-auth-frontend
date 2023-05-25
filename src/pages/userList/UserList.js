import React, { useEffect, useState } from "react";
import PageMenu from "../../components/pageMenu/PageMenu";
import "./UserList.scss";
import UserStats from "../../components/userStats/UserStats";
import Search from "../../components/search/Search";
import { FaTrashAlt } from "react-icons/fa";
import ChangeRole from "../../components/changeRole/ChangeRole";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHooks/useRedirectLoggedOutUser";
import {
  CALC_SUSPENDED_USERS,
  CALC_VERIFIED_USERS,
  deleteUser,
  getUsers,
} from "../../redux/features/auth/authSlice";
import { shortenText } from "../profile/UserProfile";
import { Spinner } from "../../components/loader/Loader";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  FILTER_USERS,
  selectFilteredUsers,
} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";
/* ------------------------------------------------------ */
//  UserList Component
const UserList = () => {
  useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();
  const {
    users,
    verifiedUsers,
    suspendedUsers,
    isLoading,
    isSuccess,
    isLoggedIn,
    message,
  } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");

  const filteredUsers = useSelector(selectFilteredUsers);

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [search, dispatch, users]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const removeUser = async (userId) => {
    await dispatch(deleteUser(userId));
    await dispatch(getUsers());
  };

  const confirmDelete = (userId) => {
    confirmAlert({
      title: "Delete This USer",
      message: "Are you sure to do delete this user ? ",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(userId),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  // begin pagination
  const itemsPerPage = 3;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;

    setItemOffset(newOffset);
  };

  //  end pagination

  return (
    <section>
      <div className="container">
        <PageMenu />

        <UserStats />

        <div className="user-list">
          {isLoading && <Spinner />}
          <div className="table">
            <div className="--flex-between">
              <span>
                <h3>All Users</h3>
              </span>

              <span>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </div>

            {!isLoading && filteredUsers.length === 0 ? (
              <p>No User Found...</p>
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Change Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((user, index) => {
                      return (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{shortenText(user.name, 8)}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <ChangeRole id={user._id} email={user.email} />
                          </td>
                          <td>
                            <span>
                              <FaTrashAlt
                                size={20}
                                color="red"
                                onClick={() => {
                                  confirmDelete(user._id);
                                }}
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <hr />

                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="Prev"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination"
                  pageLinkClassName="page-num"
                  previousLinkClassName="page-num"
                  nextLinkClassName="page-num"
                  activeClassName="activePage"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserList;
