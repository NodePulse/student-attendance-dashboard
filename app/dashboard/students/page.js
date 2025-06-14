"use client";

import React, { useEffect, useState } from "react";
import AddNewStudent from "./_componnets/AddNewStudent";
import GlobalApi from "@/app/_services/GlobalApi";
import StudentListTable from "./_componnets/StudentListTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Student = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = () => {
    GlobalApi.GetAllStudents()?.then((res) => setStudentList(res.data.result));
  };

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Students
        <AddNewStudent refreshData={getAllStudents} />
      </h2>
      <Card className="max-w-xs">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Total Student</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p>{studentList.length}</p>
        </CardContent>
      </Card>
      <StudentListTable
        studentList={studentList}
        refreshData={getAllStudents}
      />
    </div>
  );
};

export default Student;
