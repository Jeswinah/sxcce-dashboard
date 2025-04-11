import React, { useEffect } from "react";

const Hero = ({ input, SetInput, updated }) => {
  useEffect(() => {
    const storedMobile = localStorage.getItem("userMobile");
    if (storedMobile) {
      SetInput(storedMobile);
    }
  }, []);

  const handleSave = () => {
   
    localStorage.setItem("userMobile", input);

   
    const now = new Date();
    const formattedDate = now.toLocaleDateString(); // e.g., "4/11/2025"
    const formattedTime = now.toLocaleTimeString(); // e.g., "10:45:30 AM"

    const data = {
      mobile: input,
      date: formattedDate,
      time: formattedTime,
    };

    
    fetch(
      "https://script.google.com/macros/s/AKfycbxePEVgI9JQxerJamtA2TjtKYmcRFldX9qjXRL5TGNMC7NQBWb8jxz0DCdh03ugk5UYvQ/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        mode: "no-cors", 
      }
    )
      .then(() => {
        console.log("Saved successfully!");
      })
      .catch((err) => {
        console.error("Error:", err);
  
      });
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="main md:relative">
        <div className="content md:hidden">
          <h1 className="text-2xl font-semibold text-center">
            Student details
          </h1>
        </div>
        <div className="inputs flex lg:flex-row">
          <div className="input m-1 flex justify-center w-full md:justify-start md:w-3/12">
            <div className="in mt-3 flex">
              <input
                type="number"
                className="border-2 border-dotted rounded-md p-1 md:p-2 lg:ml-3"
                placeholder="Enter Mobile number"
                onChange={(e) => {
                  SetInput(e.target.value);
                }}
                value={input}
              />
              <button
                onClick={handleSave}
                className="bg-blue-900 rounded-lg mx-2 px-2 lg:px-4 py-2 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="mt-2 mb-1 text-center md:text-lg md:absolute top-3 right-10">
          Developed by{" "}
          <span className="text-red-600 font-bold font-mono">Jeswin A.H</span>
        </p>
      </div>
      <div className="content1 flex justify-center flex-1">
        <iframe
          src={`https://www.sxcce.edu.in/mobile/${updated}.php?ph=${input}`}
          frameBorder="0"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default Hero;
