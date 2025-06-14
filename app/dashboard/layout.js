import React from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

const layout = ({ children }) => {
  return (
    <div>
      <div className="md:w-64 fixed max-md:hidden">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default layout;
