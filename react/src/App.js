import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  action_deleteStudent,
  action_saveStudent,
} from "./slices/listStudent_slice";
import { useState } from "react";
import { getStudentsFake } from "./api/studentAPI";

function App() {
  const listStudent = useSelector((state) => state.listStudent);
  // console.log(listStudent);
  const dispatch = useDispatch();
  const dispatch_saveStudent = (student) =>
    dispatch(action_saveStudent(student));
  const dispatch_deleteStudent = (id) => dispatch(action_deleteStudent(id));
  const dispatch_getStudentsFake = (url) => dispatch(getStudentsFake(url));
  const [url_fakeStudent, setUrl_fakeStudent] = useState(
    "https://jsonplaceholder.typicode.com/users"
  );
  const [filterName, setFilterName] = useState("");
  const [student, setStudent] = useState({ username: "", email: "", id: "" });
  const updateState_student = (e) => {
    let newStudent = { ...student };
    newStudent[e.target.name] = e.target.value;
    setStudent(newStudent);
  };
  const onSaveStudent = (e) => {
    if (!student.username || !student.email) return;
    dispatch_saveStudent(student);
    setStudent({ username: "", email: "", id: "" });
  };

  return (
    <div className='App'>
      <button
        onClick={() => {
          setStudent({ username: "", email: "", id: "" });
        }}
      >
        New Student
      </button>{" "}
      <br />
      <input
        type='text'
        placeholder='username'
        name='username'
        value={student.username}
        onChange={updateState_student}
      />{" "}
      <br />
      <input
        type='text'
        placeholder='email'
        name='email'
        value={student.email}
        onChange={updateState_student}
      />{" "}
      <br />
      <button onClick={onSaveStudent}>
        {student.id ? "Update Student" : "Add Student"}
      </button>{" "}
      <br /> <br />
      <input
        type='text'
        placeholder='Search ...'
        name='txtFilterName'
        value={filterName}
        onChange={(e) => {
          setFilterName(e.target.value);
        }}
      />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listStudent.data
            .filter((item) => item.username.includes(filterName))
            .map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        setStudent({ ...item });
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={(e) => {
                        dispatch_deleteStudent(item.id);
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <select
        value={url_fakeStudent}
        onChange={(e) => {
          setUrl_fakeStudent(e.target.value);
        }}
      >
        <option value='https://jsonplaceholder.typicode.com/users'>
          https://jsonplaceholder.typicode.com/users
        </option>
        <option value='https://fakestoreapi.com/users?limit=10'>
          https://fakestoreapi.com/users?limit=10
        </option>
      </select>
      <br />
      <button
        onClick={(e) => {
          dispatch_getStudentsFake(url_fakeStudent);
        }}
      >
        Get Student Fake
      </button>
      {listStudent.loading && (
        <img
          src='https://vcdn-ione.vnecdn.net/2016/07/13/loading-256-0001-4566-1468383063.gif'
          width='14px'
        />
      )}
    </div>
  );
}

export default App;
