import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

/* ------------------------------------------------------ */

const initialState = {
  filteredUsers: [],
};

/* ---------------------------------- -------------------- */
export const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    FILTER_USERS(state, action) {
      const { users, search } = action.payload;

      const tempUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredUsers = tempUsers;
    },
  },
});

export const { FILTER_USERS } = filterSlice.actions;
export const selectFilteredUsers = (state) => state.filter.filteredUsers;

export default filterSlice.reducer;