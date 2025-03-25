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
    if (!input) {
      alert("Enter a mobile number");
    }
    alert("Mobile number saved!");
  };

  const dates = new Date().toString();
  console.log(dates);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="main">
        <div className="content md:hidden">
          <h1 className="text-2xl font-semibold text-center">
            Student details
          </h1>
        </div>
        <div className="inputs flex  lg:flex-row">
          <div className="input m-1 flex  md:justify-start  md:w-3/12">
            <div className="in mt-3 ">
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
                className="bg-blue-900 rounded-lg mx-2 px-2 lg:px-4 h-full  text-white "
              >
                Save
              </button>
            </div>
          </div>
        </div>
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
