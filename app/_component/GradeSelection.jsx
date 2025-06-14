"use client";

import React, { useEffect, useState } from "react";
import GlobalApi from "../_services/GlobalApi";

const GradeSelection = ({ selectedGrade }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    getGradesList();
  }, []);

  const getGradesList = () => {
    GlobalApi.GetAllGrades()?.then((res) => setGrades(res.data.result));
  };

  return (
    <div>
      <select
        className="p-2 border rounded-lg"
        onChange={(e) => selectedGrade(e.target.value)}
      >
        {grades.map((grade, index) => (
          <option key={grade.id} value={grade.grade}>
            {grade.grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelection;
