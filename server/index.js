// import all the required packages
const express = require("express"); // to create the actual server that will listen to all the requests
const cors = require("cors"); // to allow requests from clients on different origins
const bodyParser = require("body-parser"); // to parse all the incoming request bodies to json format

const {
  home,
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("./services");

const app = express(); // creating an instanace of the express module
app.use(cors()); // use the cors module in our server
app.use(bodyParser()); // use the body-parser module in our server

app.get("/", home);
app.get("/getAllStudents", getAllStudents);
app.post("/addStudent", addStudent);
app.patch("/updateStudent/:roll", updateStudent);
app.delete("/deleteStudent/:roll", deleteStudent);

app.listen(4000, () => {
  console.log("App listening on port: 4000");
});
