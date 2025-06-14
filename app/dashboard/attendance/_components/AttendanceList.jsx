"use client";

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

const AttendanceList = ({ attendanceList, selectedMonth }) => {
  const [rowData, setRowData] = useState([]);
  const [colDef, setColDef] = useState([]);

  const daysInmonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  const numberOfdays = daysInmonth(
    selectedMonth &&
      selectedMonth.toLocaleString("default", { year: "numeric" }),
    selectedMonth &&
      selectedMonth.toLocaleString("default", { month: "numeric" })
  );
  const daysArray = Array.from(
    { length: numberOfdays },
    (_, index) => index + 1
  );

  useEffect(() => {
    setColDef([
      { field: "studentId", filter: true },
      { field: "name", filter: true },
    ]);
    if (attendanceList) {
      const userList = getUniqueRecord();
      setRowData(userList);

      daysArray.forEach((day) => {
        setColDef((prev) => [
          ...prev,
          { field: day.toString(), width: 50, editable: true },
        ]);
        userList.forEach((user) => {
          user[day] = isPresent(user.studentId, day);
        });
      });
    }
  }, [attendanceList]);

  const isPresent = (id, day) => {
    const result = attendanceList.find(
      (elem) => elem.day == day && elem.studentId == id
    );
    return result ? true : false;
  };

  const getUniqueRecord = () => {
    const uniqueRecord = [];
    const existingUser = new Set();

    attendanceList.forEach((element) => {
      if (!existingUser.has(element.studentId)) {
        existingUser.add(element.studentId);
        uniqueRecord.push(element);
      }
    });

    return uniqueRecord;
  };

  const markAttendance = (day, id, status) => {
    if (status) {
      const data = {
        day: day,
        studentId: id,
        status: status,
        date: selectedMonth.toLocaleString("default", {
          month: "numeric",
          year: "numeric",
        }),
      };

      GlobalApi.MarkAttendance(data)?.then((res) => {
        console.log(res.data);
        toast.success(`Student Id: ${id} marked as present`);
      });
    }
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDef}
        onCellValueChanged={(e) =>
          markAttendance(e.colDef.field, e.data.studentId, e.newValue)
        }
      />
    </div>
  );
};

export default AttendanceList;

// "use client";
// import React, { useEffect, useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import GlobalApi from "@/app/_services/GlobalApi";
// import { toast } from "sonner";
// import { getUniqueRecord } from "@/lib/utils";

// const AttendanceList = ({ attendanceList, selectedMonth }) => {
//   const [rowData, setRowData] = useState([]);
//   const [colDef, setColDef] = useState([]);

//   const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

//   useEffect(() => {
//     if (attendanceList && selectedMonth) {
//       const year = selectedMonth.toLocaleString("default", { year: "numeric" });
//       const month = selectedMonth.toLocaleString("default", {
//         month: "numeric",
//       });
//       const numberOfDays = daysInMonth(year, month);

//       const daysArray = Array.from(
//         { length: numberOfDays },
//         (_, index) => index + 1
//       );

//       const newColDef = [
//         { field: "studentId", headerName: "Student ID", filter: true },
//         { field: "name", headerName: "Name", filter: true },
//         ...daysArray.map((day) => ({
//           field: day.toString(),
//           width: 50,
//           editable: true,
//         })),
//       ];
//       setColDef(newColDef);

//       const uniqueRecords = getUniqueRecord();
//       uniqueRecords.forEach((user) => {
//         daysArray.forEach((day) => {
//           user[day] = isPresent(user.studentId, day);
//         });
//       });
//       setRowData(uniqueRecords);
//     }
//   }, [attendanceList, selectedMonth]);

//   const isPresent = (id, day) => {
//     const result = attendanceList.find(
//       (elem) => elem.day == day && elem.studentId == id
//     );
//     return result ? true : false;
//   };

//   const markAttendance = (day, id, status) => {
//     const date = selectedMonth.toLocaleString("default", {
//       month: "numeric",
//       year: "numeric",
//     });
//     if (status) {
//       const data = {
//         day: parseInt(day, 10),
//         studentId: id,
//         status: status,
//         date: date,
//       };

//       GlobalApi.MarkAttendance(data)?.then((res) => {
//         toast.success(
//           `Student Id: ${id} marked as ${status ? "present" : "absent"}`
//         );
//       });
//     } else {
//       GlobalApi.MarkAbsent(id, day, date)?.then((res) => {
//         console.log(res);
//         toast.success(`Student Id: ${id} marked as absent.`);
//       });
//     }
//   };

//   return (
//     <div className="ag-theme-quartz" style={{ height: 500 }}>
//       <AgGridReact
//         rowData={rowData}
//         columnDefs={colDef}
//         onCellValueChanged={(e) =>
//           markAttendance(e.colDef.field, e.data.studentId, e.newValue)
//         }
//       />
//     </div>
//   );
// };

// export default AttendanceList;
