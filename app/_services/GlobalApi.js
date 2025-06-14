const { default: axios } = require("axios");

const GetAllGrades = () => axios.get("/api/grade");
const CreateNewStudents = (data) => axios.post("/api/student", data);
const GetAllStudents = () => axios.get("/api/student");
const DeleteStudentsRecord = (id) => axios.delete("/api/student?id=" + id);
const GetAttendanceList = (grade, month) =>
  axios.get("/api/attendance?grade=" + grade + "&month=" + month);
const MarkAttendance = (data) => axios.post("/api/attendance", data);
const MarkAbsent = (id, day, date) =>
  axios.delete(`/api/attendance?studentId=${id}&day=${day}&date=${date}`);
const TotalPresentCountByDay = (date, grade) => axios.get(`/api/dashboard?date=${date}&grade=${grade}`)

export default {
  GetAllGrades,
  CreateNewStudents,
  GetAllStudents,
  DeleteStudentsRecord,
  GetAttendanceList,
  MarkAttendance,
  MarkAbsent,
  TotalPresentCountByDay
};
