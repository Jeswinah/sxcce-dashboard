import React, { useEffect } from "react";

const Hero = ({ input, SetInput, updated, checkedNumber, setCheckedNumber }) => {
  const [msg, setMsg] = React.useState("Enter a valid roll number or mobile number");
  useEffect(() => {
    const storedMobile = localStorage.getItem("userMobile");
    if (storedMobile) {
      SetInput(storedMobile);
    }
  }, []);

  const handleSave = () => {
    if (!input || input.length < 4) {
      alert("Enter a valid roll number or mobile number");
      setMsg("Enter a valid roll number or mobile number");
      return;
    }

    localStorage.setItem("userMobile", input);
    setCheckedNumber(input);
    alert("Logged in successfully!");
      setMsg("")

    const now = new Date();
    const data = {
      mobile: input,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };

    fetch(
      "https://script.google.com/macros/s/AKfycbzDriMlP2jrCZ9RQCSQ6x9Ddx6ZMF8m4iqWkMcTbmtGkRWGYjAtFyGpC430Uj2Bia6P/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        mode: "no-cors",
      }
    )
      .then(() => {})
      .catch(() => {});
  };

  // Helper to check if input is roll number (not 10 digits)
  const isRollNumber = (val) => {
    return val && val.length > 0 && val.length !== 10;
  };

  // Compute iframe src based on input
  let iframeSrc = "";
  if (isRollNumber(input)) {
 
    if (updated === "events") {
      iframeSrc = `https://www.sxcce.edu.in/mobile/events.php?rollno=${input}`;
    } else {
      iframeSrc = `https://www.sxcce.edu.in/mobile/r_${updated}.php?rollno=${input}`;
    }
  } else if (input && input.length === 10) {
   
    iframeSrc = `https://www.sxcce.edu.in/mobile/${updated}.php?ph=${input}`;
  }

  return (
    <div className="w-full h-screen flex flex-col">
      
      <div className="main md:relative">
        <div className="content md:hidden">
          <h1 className="text-2xl font-semibold text-center">Student details</h1>
        </div>
        <div className="inputs flex lg:flex-row">
          <div className="input m-1 flex justify-center w-full md:justify-start md:w-3/12">
            <div className="in mt-3 flex">
              <input
                type="text"
                className="border-2 border-dotted rounded-md p-1 md:p-2 lg:ml-3"
                placeholder="Enter Roll number or Mobile number"
                onChange={(e) => SetInput(e.target.value)}
                value={input}
              />
              <button
                onClick={handleSave}
                className="bg-blue-900 rounded-lg mx-2 px-2 lg:px-4 py-2 text-white"
              >
                Check
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
         <div>
        {
          msg && (
            <h1 className="text-center text-red-500 font-semibold text-xl">{msg}</h1>
          )
        }
      </div>
      <div className="content1 flex justify-center flex-1">
        {iframeSrc && (
          <iframe src={iframeSrc} frameBorder="0" className="w-full h-full"></iframe>
        )}
      </div>
    
    </div>
  );
};

export default Hero;
