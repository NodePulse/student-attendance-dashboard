import React from "react";

const Card = ({ icon, title, value }) => {
  return (
    <div className="flex items-center gap-5 p-7 bg-cyan-100 rounded-lg shadow-md">
      <div className="p-2 h-10 w-10 rounded-full bg-white text-primary">
        {icon}
      </div>
      <div className="">
        <h2 className="font-bold">{title}</h2>
        <h2 className="text-lg">{value}</h2>
      </div>
    </div>
  );
};

export default Card;
