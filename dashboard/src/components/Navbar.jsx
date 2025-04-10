import React from "react";
import clglogo from "../assets/clg_logo.png";

const Navbar = ({ inputval, setInputval, setUpdated,setShowNavbar }) => {
  const newarr = {
    "Dashboard": "dashboard",
    "Student Details": "studview",
    "Fees": "fees",
    "Internal Marks": "imarks",
    "Attendance": "absent",
    "Sem Marks": "emarks",
    // "Discipline":"discipline",
    // "Events":"events",

  };

  const handler = (event) => {
    const v = event.target.value
      setInputval(newarr[v]);
      setUpdated(newarr[v]);
      setShowNavbar(false);
  };

  return (
    <nav className="w-full bg-gray-200 h-screen md:static fixed ">
      <img src={clglogo} alt="College Logo" className="py-5 mx-auto" />
      <div className="container flex flex-col justify-around h-9/12">
        {Object.keys(newarr).map((val, index) => (
          <button
            key={index}
            value={val}
            className="bg-blue-900 text-white p-2 lg:w-10/12 lg:mx-auto rounded-lg mx-4 hover:bg-indigo-400"
            onClick={handler}
          >
            {val}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
