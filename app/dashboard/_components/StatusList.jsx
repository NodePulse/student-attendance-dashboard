"use client";

import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const StatusList = ({ attendanceList }) => {
  const [totalStudent, setTotalStudent] = useState(0);
  const [percentPresent, setPercentPresent] = useState(0);

  useEffect(() => {
    if (attendanceList) {
      const totalStud = getUniqueRecord(attendanceList);
      setTotalStudent(totalStud.length);

      const today = moment().format("D");
      const precentagePresent =
        (attendanceList?.length / (totalStud.length * Number(today))) * 100;
      setPercentPresent(precentagePresent);
    }
  }, [attendanceList]);

  const getUniqueRecord = () => {
    const uniqueRecord = [];
    const existingUser = new Set();

    attendanceList?.forEach((element) => {
      if (!existingUser.has(element.studentId)) {
        existingUser.add(element.studentId);
        uniqueRecord.push(element);
      }
    });

    return uniqueRecord;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
      <Card
        icon={<GraduationCap />}
        title="Total Student"
        value={totalStudent}
      />
      <Card
        icon={<TrendingUp />}
        title="Total % Present"
        value={`${percentPresent.toFixed(1)}%`}
      />
      <Card
        icon={<TrendingDown />}
        title="Total % Absent"
        value={`${(100 - totalStudent).toFixed(1)}%`}
      />
    </div>
  );
};

export default StatusList;
