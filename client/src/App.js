import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = "http://localhost:4000";

// const dummyStudents = [
//   {
//     name: "Adarsh",
//     roll: 21,
//     age: 25,
//   },
//   {
//     name: "Aman",
//     roll: 1,
//     age: 22,
//   },
//   {
//     name: "Abhyushi",
//     roll: 2,
//     age: 21,
//   },
//   {
//     name: "Gaurav",
//     roll: 27,
//     age: 24,
//   },
//   {
//     name: "Abhishek",
//     roll: 5,
//     age: 24,
//   },
// ];

function App() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({ name: "", roll: "", age: "" });

  const getAllStudents = () => {
    axios.get(`${BASE_URL}/getAllStudents`).then((res) => {
      console.log(res);
      if (res.data) {
        setStudents(res.data);
      }
    });
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/addStudent`, student).then((res) => {
      console.log(res);
      if (res.data) {
        getAllStudents();
      }
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    const updatedStudent = { ...student, [key]: value };
    setStudent(updatedStudent);
  };

  const handleDelete = (roll) => {
    axios.delete(`${BASE_URL}/deleteStudent/${roll}`).then((res) => {
      if (res.status === 200) getAllStudents();
      else alert("Error while deleting: ", res.data);
    });
  };

  return (
    <div className="App">
      <div className="students-list">
        <div>List of all students: </div>
        <div>
          {students.map(({ name, roll, age }, index) => (
            <div key={roll} className="student">
              Student {index + 1}:<div>Name: {name}</div>{" "}
              <div>Roll no.:{roll}</div>
              <div>Age: {age}</div>
              <button onClick={() => handleDelete(roll)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div className="student-form">
        Create a new student:
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              name="name"
              value={student.name}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="roll">Roll no.:</label>
            <input
              id="roll"
              name="roll"
              value={student.roll}
              onChange={handleChange}
              type="number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              value={student.age}
              onChange={handleChange}
              type="number"
            />
          </div>
          <div className="form-button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
