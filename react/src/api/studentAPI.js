import {
  action_getListStudentsOnline,
  action_setListStudent,
} from "../slices/listStudent_slice";

export const getStudentsFake = (url) => async (dispatch) => {
  dispatch(action_getListStudentsOnline());
  let response = await fetch(url);
  let responseJSON = await response.json();
  console.log(responseJSON);
  dispatch(action_setListStudent(responseJSON));
};
