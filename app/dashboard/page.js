"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import MonthSelection from "../_component/MonthSelection";
import GradeSelection from "../_component/GradeSelection";
import GlobalApi from "../_services/GlobalApi";
import StatusList from "./_components/StatusList";
import moment from "moment";
import BarChartComponent from "./_components/BarChartComponent";
import PieChartComponent from "./_components/PieChartComponent";

const Dashboard = () => {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState("7th");
  const [attendanceList, setAttendanceList] = useState();
  const [totalPresentData, setTotalPresentData] = useState([])

  useEffect(() => {
    setTheme("system");
    getTotalPresentCountByDay()
    getStudentAttendance();
  }, [selectedMonth || selectedGrade]);

  const getStudentAttendance = () => {
    GlobalApi.GetAttendanceList(selectedGrade, moment(selectedMonth).format("M/YYYY")).then(
      (res) => setAttendanceList(res.data.result)
    );
  };

  const getTotalPresentCountByDay = () => {
    GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format("M/YYYY"), selectedGrade).then(
      res => setTotalPresentData(res.data)
    )
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelection selectedGrade={(val) => setSelectedGrade(val)} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <BarChartComponent attendanceList={attendanceList} totalPresentData={totalPresentData} />
        </div>
        <div className="">
          <PieChartComponent attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
