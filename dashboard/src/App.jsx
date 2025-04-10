import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const App = () => {
  const [input, setInput] = useState("");
  const [inputval, setInputval] = useState("dashboard");
  const [updated, setUpdated] = useState("dashboard");
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className="w-full flex ">
      <button
        className="absolute top-0 md:hidden px-2 py-1 text-black"
        onClick={() => setShowNavbar(!showNavbar)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div
        className={`fixed md:static top-0 left-0 h-full md:w-4/12 lg:w-2/12 w-3/4 bg-gray-200 shadow-lg 
                    transition-all duration-300 ease-in-out 
                    ${
                      showNavbar
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }`}
      >
        <Navbar
          inputval={inputval}
          setInputval={setInputval}
          setUpdated={setUpdated}
          setShowNavbar={setShowNavbar}
        />
      </div>
      <Hero input={input} SetInput={setInput} updated={updated} />
    </div>
  );
};

export default App;
