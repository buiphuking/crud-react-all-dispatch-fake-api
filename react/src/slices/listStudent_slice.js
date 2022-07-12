import { createSlice } from "@reduxjs/toolkit";

let listStudent_local = JSON.parse(localStorage.getItem("listStudent")) || {
  data: [],
  loading: false,
};
const listStudent_slice = createSlice({
  name: "listStudent",
  initialState: listStudent_local,
  reducers: {
    action_saveStudent(state, action) {
      if (!action.payload.id) {
        let new_student = {
          username: action.payload.username,
          email: action.payload.email,
        };
        state.data.push(new_student);
      } else {
        let find_student = state.data.find(
          (item) => item.id === action.payload.id
        );
        find_student.username = action.payload.username;
        find_student.email = action.payload.email;
      }
      localStorage.setItem("listStudent", JSON.stringify(state));
      return state;
    },
    action_deleteStudent(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload);
      localStorage.setItem("listStudent", JSON.stringify(state));
      return state;
    },
    action_setListStudent(state, action) {
      state.data = action.payload.map((item) => ({
        username: item.username,
        email: item.email,
        id: item.id,
      }));
      state.loading = false;
      localStorage.setItem("listStudent", JSON.stringify(state));
      return state;
    },
    action_getListStudentsOnline(state, action) {
      state.loading = true;
      return state;
    },
  },
});

export const {
  action_saveStudent,
  action_deleteStudent,
  action_setListStudent,
  action_getListStudentsOnline,
} = listStudent_slice.actions;
export const listStudent_reducer = listStudent_slice.reducer;
