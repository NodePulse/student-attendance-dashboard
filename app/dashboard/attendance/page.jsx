"use client";

import GradeSelection from "@/app/_component/GradeSelection";
import MonthSelection from "@/app/_component/MonthSelection";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import { formatMonthYear } from "@/lib/utils";
import React, { useState } from "react";
import AttendanceList from "./_components/AttendanceList";

const Attendance = () => {
  const x = new Date();
  const [selectedMonth, setSelectedMonth] = useState(x);
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState([]);

  const searchHandler = () => {
    const month = formatMonthYear(selectedMonth);

    GlobalApi.GetAttendanceList(selectedGrade, month)?.then((res) => {
      setAttendanceList(res.data.result);
    });
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendance</h2>
      <div className="flex gap-4 p-3 my-5 shadow-md border rounded-lg">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(val) => setSelectedMonth(val)} />
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Grade:</label>
          <GradeSelection selectedGrade={(val) => setSelectedGrade(val)} />
        </div>
        <Button onClick={searchHandler}>Search</Button>
      </div>
      <AttendanceList
        attendanceList={attendanceList}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default Attendance;
