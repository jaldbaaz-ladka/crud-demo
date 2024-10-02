// our in-memory data store to store the students
let students = [];

// a handler to handle requests on / route
this.home = (req, res) => {
  res.send("App is up and running. Send CRUD requests");
};

this.getAllStudents = (req, res) => {
  return res.status(200).json(students);
};

this.addStudent = (req, res) => {
  const student = req.body;
  console.log("Got student in addStudent req: ", student);
  students.push(student);
  return res.send("Student added successfully.");
};

this.updateStudent = (req, res) => {
  const { roll } = req.body;
  let found = false;
  const updatedStudents = students.map((student) => {
    if (roll === student.roll) {
      found = true;
      return req.body;
    }
    return student;
  });
  if (found) {
    students = updatedStudents;
    return res.status(200).send("Updated successfully!");
  } else {
    return res.status(400).send("Invalid student roll!");
  }
};

this.deleteStudent = (req, res) => {
  console.log(req);
  const { roll } = req.params;
  let found = false;
  const updatedStudents = students.filter((student) => {
    if (roll === student.roll) {
      found = true;
      return false;
    }
    return true;
  });
  if (found) {
    students = updatedStudents;
    return res.status(200).send("Deleted successfully!");
  } else {
    return res.status(400).send("Invalid student roll!");
  }
};
