import React, { useState, useEffect } from "react";

// Grade to Grade Point mapping (2022 Regulation)
const gradePoints = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  U: 0,
  RA: 0,
  AB: 0,
  W: 0,
};

// Subject code to credits and name mapping (SXCCE R2022 B.E. CSE)
// Based on official SXCCE Curriculum PDF - Total 165 Credits
const defaultSubjectInfo = {
  // ============ SEMESTER 1 ============
  "MA22101": { credits: 4, name: "Matrices and Calculus" },
  "PH22101": { credits: 3, name: "Engineering Physics" },
  "CH22101": { credits: 3, name: "Engineering Chemistry" },
  "CS22101": { credits: 3, name: "Problem Solving and Python Programming" },
  "HS22102": { credits: 2, name: "Universal Human Values" },
  "GE3152": { credits: 1, name: "Heritage of Tamils" },
  "EN22101": { credits: 3, name: "Communicative English" },
  "BS22101": { credits: 2, name: "Physics and Chemistry Laboratory" },
  "CS22102": { credits: 2, name: "Python Programming Laboratory" },
  "HS22101": { credits: 1, name: "Higher Order Thinking" },
  
  // ============ SEMESTER 2 ============
  "MA22201": { credits: 4, name: "Statistics and Numerical Methods" },
  "ES22202": { credits: 3, name: "Basic Electrical and Electronics Engineering" },
  "CS22201": { credits: 3, name: "Programming in C" },
  "ME22201": { credits: 3, name: "Engineering Graphics" },
  "GE3252": { credits: 1, name: "Tamils and Technology" },
  "EN22201": { credits: 3, name: "Technical English" },
  "PH22203": { credits: 3, name: "Physics for Information Science" },
  "CH22201": { credits: 3, name: "Environment and Sustainability" },
  "CS22202": { credits: 2, name: "C Programming Laboratory" },
  "ES22203": { credits: 2, name: "Engineering Practices Laboratory" },
  
  // ============ SEMESTER 3 ============
  "MA22302": { credits: 4, name: "Discrete Mathematics" },
  "CS22301": { credits: 3, name: "Object Oriented Programming" },
  "CS22302": { credits: 3, name: "Data Structures" },
  "CS22303": { credits: 3, name: "Digital Principles and System Design" },
  "CS22304": { credits: 3, name: "Computer Organization and Architecture" },
  "CS22305": { credits: 2, name: "Object Oriented Programming Laboratory" },
  "CS22306": { credits: 2, name: "Data Structures Laboratory" },
  "SD22301": { credits: 2, name: "Coding Skills and Soft Skills – Phase I" },
  
  // ============ SEMESTER 4 ============
  "MA22401": { credits: 4, name: "Probability and Statistical Techniques" },
  "CS22401": { credits: 3, name: "Design and Analysis of Algorithms" },
  "CS22402": { credits: 3, name: "Database Management Systems" },
  "CS22403": { credits: 3, name: "Operating Systems" },
  "CS22404": { credits: 3, name: "Computer Networks" },
  "CS22405": { credits: 2, name: "DBMS Laboratory" },
  "CS22406": { credits: 2, name: "OS and Networks Laboratory" },
  "SD22401": { credits: 1, name: "Coding Skills and Soft Skills – Phase II" },
  
  // ============ SEMESTER 5 ============
  "CS22501": { credits: 3, name: "Theory of Computation" },
  "CS22502": { credits: 4, name: "Internet Programming" },
  "CS22503": { credits: 1, name: "Technical Seminar" },
  "CS22504": { credits: 1, name: "Inplant / Industrial Training" },
  "SD22501": { credits: 2, name: "Coding Skills and Soft Skills – Phase III" },
  
  // ============ SEMESTER 6 ============
  "HS22601": { credits: 3, name: "Professional Ethics" },
  "CS22601": { credits: 3, name: "Compiler Design" },
  "IT22601": { credits: 3, name: "Data Science" },
  "SD22601": { credits: 2, name: "Coding Skills and Quantitative Aptitude – Phase I" },
  
  // ============ SEMESTER 7 ============
  "MS22701": { credits: 3, name: "Principles of Management" },
  "CS22701": { credits: 3, name: "Artificial Intelligence and Machine Learning" },
  "CS22702": { credits: 2, name: "Mobile Application Development Laboratory" },
  "CS22703": { credits: 3, name: "Mini Project" },
  "SD22701": { credits: 2, name: "Coding Skills and Quantitative Aptitude – Phase II" },
  
  // ============ SEMESTER 8 ============
  "CS22801": { credits: 8, name: "Project Work" },
  
  // ============ PROFESSIONAL ELECTIVES - Big Data and Analytics ============
  "CS22511": { credits: 3, name: "Data Mining" },
  "CS22512": { credits: 3, name: "NoSQL Databases" },
  "CS22611": { credits: 3, name: "Big Data Analytics" },
  "CS22612": { credits: 3, name: "Exploratory Data Analysis" },
  "CS22711": { credits: 3, name: "Business Analytics" },
  "CS22712": { credits: 3, name: "Image and Video Analytics" },
  
  // ============ PROFESSIONAL ELECTIVES - Computational Intelligence ============
  "CS22521": { credits: 3, name: "Soft Computing" },
  "CS22522": { credits: 3, name: "Artificial Neural Network" },
  "CS22621": { credits: 3, name: "Computer Vision" },
  "CS22622": { credits: 3, name: "Deep Learning" },
  "CS22721": { credits: 3, name: "Genetic Algorithms and Swarm Intelligence" },
  "CS22722": { credits: 3, name: "Natural Language Processing" },
  
  // ============ PROFESSIONAL ELECTIVES - Cyber Security ============
  "CS22531": { credits: 3, name: "Cryptography and Network Security" },
  "CS22532": { credits: 3, name: "Cyber Security" },
  "CS22631": { credits: 3, name: "Social Network Analysis" },
  "CS22632": { credits: 3, name: "Ethical Hacking" },
  "CS22731": { credits: 3, name: "Cyber Forensics" },
  "CS22732": { credits: 3, name: "Blockchain Technologies" },
  
  // ============ PROFESSIONAL ELECTIVES - Web Technology ============
  "IT22511": { credits: 3, name: "Full Stack Web Development" },
  "CS22541": { credits: 3, name: "PHP Programming" },
  "CS22641": { credits: 3, name: "UI/UX Design" },
  "CS22642": { credits: 3, name: "Cloud and DevOps Tools" },
  "CS22741": { credits: 3, name: "Web Application Security" },
  "CS22742": { credits: 3, name: "Rich Internet Applications" },
  
  // ============ PROFESSIONAL ELECTIVES - Software Engineering & QM ============
  "CS22551": { credits: 3, name: "Software Engineering" },
  "CS22552": { credits: 3, name: "Software System Design" },
  "CS22651": { credits: 3, name: "Software Testing and Automation" },
  "CS22652": { credits: 3, name: "Engineering Secure Software System" },
  "CS22751": { credits: 3, name: "Software Quality Assurance" },
  "CS22752": { credits: 3, name: "Software Project Management" },
  "CS22753": { credits: 3, name: "Salesforce Administration" },
  
  // ============ OPEN ELECTIVES ============
  "CS22681": { credits: 3, name: "Data Science for Engineers" },
  "CS22682": { credits: 3, name: "Data Analytics" },
  "CS22781": { credits: 3, name: "IoT Applications" },
  "CS22782": { credits: 3, name: "Cyber Crime and Laws" },
  "CS22783": { credits: 3, name: "Green Computing" },
  "CS22784": { credits: 3, name: "Web Design and Development" },
  
  // ============ MANDATORY (Zero Credit) ============
  "IP22101": { credits: 0, name: "Induction Programme" },
  "AC22301": { credits: 0, name: "Constitution of India" },
  "HS22301": { credits: 0, name: "Value Education I" },
  "AC22401": { credits: 0, name: "Industrial Safety Engineering" },
  "AC22501": { credits: 0, name: "Entrepreneurship Development" },
  "HS22501": { credits: 0, name: "Value Education II" },
};

const CGPACalculator = ({ mobile }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [semesterData, setSemesterData] = useState([]);
  const [semesterGPA, setSemesterGPA] = useState({});
  const [overallCGPA, setOverallCGPA] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalGradePoints, setTotalGradePoints] = useState(0);
  const [subjectInfo, setSubjectInfo] = useState(defaultSubjectInfo);
  const [editingSubject, setEditingSubject] = useState(null);
  const [showCreditEditor, setShowCreditEditor] = useState(false);

  // Load saved subject info from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("subjectCredits");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSubjectInfo({ ...defaultSubjectInfo, ...parsed });
      } catch (e) {
        console.error("Failed to load saved credits:", e);
      }
    }
  }, []);

  // Get credits for a subject
  const getCreditsForSubject = (code) => {
    if (subjectInfo[code]) {
      return subjectInfo[code].credits;
    }
    // Fallback logic based on patterns for electives and unknown subjects
    if (code.startsWith("SD")) return 2; // Skill Development / Coding Skills
    if (code.startsWith("PEC") || code.startsWith("OEC")) return 3; // Electives
    if (code.startsWith("MA")) return 4; // Maths
    if (code.endsWith("01") && code.length === 7) return 3; // Theory subjects
    if (code.endsWith("05") || code.endsWith("06")) return 2; // Labs
    return 3; // Default
  };

  // Get subject name
  const getSubjectName = (code) => {
    if (subjectInfo[code]) {
      return subjectInfo[code].name;
    }
    return code;
  };

  // Update subject credits and save to localStorage
  const updateSubjectCredits = (code, credits, name) => {
    const updated = {
      ...subjectInfo,
      [code]: { credits: parseInt(credits), name: name || code }
    };
    setSubjectInfo(updated);
    
    // Save to localStorage
    const toSave = {};
    Object.keys(updated).forEach(key => {
      if (!defaultSubjectInfo[key] || 
          updated[key].credits !== defaultSubjectInfo[key]?.credits ||
          updated[key].name !== defaultSubjectInfo[key]?.name) {
        toSave[key] = updated[key];
      }
    });
    localStorage.setItem("subjectCredits", JSON.stringify(toSave));
    
    // Recalculate CGPA
    if (semesterData.length > 0) {
      const updatedData = semesterData.map(s => ({
        ...s,
        credits: s.code === code ? parseInt(credits) : s.credits,
        name: s.code === code ? (name || s.name) : s.name
      }));
      setSemesterData(updatedData);
      
      const semWiseData = {};
      updatedData.forEach(s => {
        if (!semWiseData[s.semester]) semWiseData[s.semester] = [];
        semWiseData[s.semester].push(s);
      });
      calculateCGPA(updatedData, semWiseData);
    }
    
    setEditingSubject(null);
  };
  const [showManual, setShowManual] = useState(false);
  const [manualEntries, setManualEntries] = useState([
    { credits: "", grade: "" },
    { credits: "", grade: "" },
    { credits: "", grade: "" },
  ]);

  useEffect(() => {
    if (mobile) {
      fetchMarks();
    }
    // eslint-disable-next-line
  }, [mobile]);

  const fetchMarks = async () => {
    if (!mobile) {
      setError("Please enter your mobile number and click Check.");
      return;
    }

    setLoading(true);
    setError("");

    const targetUrl = `https://www.sxcce.edu.in/mobile/emarks.php?ph=${mobile}`;
    
    // Try multiple CORS proxies
    const proxies = [
      {
        url: `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`,
        isJson: true
      },
      {
        url: `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
        isJson: false
      },
      {
        url: `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
        isJson: false
      },
    ];

    for (const proxy of proxies) {
      try {
        console.log("Trying proxy:", proxy.url);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(proxy.url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          let html;
          if (proxy.isJson) {
            const data = await response.json();
            html = data.contents;
          } else {
            html = await response.text();
          }
          
          console.log("Fetched HTML length:", html?.length);
          console.log("HTML preview:", html?.substring(0, 1000));
          
          if (html && html.length > 100) {
            const success = parseMarksData(html);
            if (success) {
              return; // Successfully parsed
            }
          }
        }
      } catch (err) {
        console.error("Proxy failed:", proxy.url, err.message);
      }
    }

    // All proxies failed
    setError("Could not fetch marks automatically. Please scroll down to view your marks in the iframe and use the manual calculator.");
    setLoading(false);
  };

  const parseMarksData = (html) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const allSubjects = [];
      const semWiseData = {};

      // Find all tables with marks data
      const tables = doc.querySelectorAll("table");
      
      console.log("Found tables:", tables.length);

      tables.forEach((table) => {
        const rows = table.querySelectorAll("tr");
        
        rows.forEach((row, rowIndex) => {
          // Skip header rows
          if (rowIndex === 0) return;
          
          const cells = row.querySelectorAll("td");
          if (cells.length < 3) return;
          
          const cellTexts = Array.from(cells).map((c) => c.textContent.trim());
          
          // Expected format: Sem | SubCode | Result | Month | Year
          // Column 0: Semester (1-8)
          // Column 1: Subject Code (like BS22101)
          // Column 2: Grade/Result (O, A+, A, B+, B, C, U, RA, AB)
          
          const semText = cellTexts[0];
          const subjectCode = cellTexts[1]?.toUpperCase();
          const gradeText = cellTexts[2]?.toUpperCase().trim();
          
          const semester = parseInt(semText);
          
          // Validate semester and grade
          if (isNaN(semester) || semester < 1 || semester > 8) return;
          if (!gradeText || gradePoints[gradeText] === undefined) return;
          if (!subjectCode || subjectCode.length < 5) return;
          
          // Get credits from lookup table
          const credits = getCreditsForSubject(subjectCode);
          const subjectName = getSubjectName(subjectCode);
          
          const subjectData = {
            code: subjectCode,
            name: subjectName,
            credits: credits,
            grade: gradeText,
            gradePoint: gradePoints[gradeText],
            semester: semester,
          };
          
          allSubjects.push(subjectData);

          if (!semWiseData[semester]) {
            semWiseData[semester] = [];
          }
          semWiseData[semester].push(subjectData);
        });
      });

      // Method 2: If no tables, try to parse from raw text patterns
      if (allSubjects.length === 0) {
        console.log("No tables found, trying text pattern matching...");
        const bodyText = doc.body?.textContent || html;
        
        // Look for patterns like: 1 BS22101 A+ NOV 2023
        const pattern = /(\d)\s+([A-Z]{2}\d{5})\s+(O|A\+|A|B\+|B|C|U|RA|AB|W)/gi;
        let match;
        
        while ((match = pattern.exec(bodyText)) !== null) {
          const semester = parseInt(match[1]);
          const subjectCode = match[2].toUpperCase();
          const grade = match[3].toUpperCase();
          const credits = getCreditsForSubject(subjectCode);
          const subjectName = getSubjectName(subjectCode);
          
          const subjectData = {
            code: subjectCode,
            name: subjectName,
            credits: credits,
            grade: grade,
            gradePoint: gradePoints[grade],
            semester: semester,
          };
          allSubjects.push(subjectData);
          
          if (!semWiseData[semester]) {
            semWiseData[semester] = [];
          }
          semWiseData[semester].push(subjectData);
        }
      }

      console.log("Total parsed subjects:", allSubjects.length);
      console.log("Parsed subjects:", allSubjects);

      if (allSubjects.length > 0) {
        // Sort by semester then by code
        allSubjects.sort((a, b) => a.semester - b.semester || a.code.localeCompare(b.code));
        setSemesterData(allSubjects);
        calculateCGPA(allSubjects, semWiseData);
        setLoading(false);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (err) {
      console.error("Parse error:", err);
      setLoading(false);
      return false;
    }
  };

  const calculateCGPA = (subjects, semWiseData) => {
    let totalCreds = 0;
    let totalPoints = 0;
    const semGPA = {};

    // Calculate semester-wise GPA
    Object.keys(semWiseData).forEach((sem) => {
      let semCredits = 0;
      let semPoints = 0;

      semWiseData[sem].forEach((subject) => {
        semCredits += subject.credits;
        semPoints += subject.credits * subject.gradePoint;
      });

      semGPA[sem] = semCredits > 0 ? (semPoints / semCredits).toFixed(2) : 0;
      totalCreds += semCredits;
      totalPoints += semPoints;
    });

    setSemesterGPA(semGPA);
    setTotalCredits(totalCreds);
    setTotalGradePoints(totalPoints);
    setOverallCGPA(totalCreds > 0 ? (totalPoints / totalCreds).toFixed(2) : 0);
  };

  const getGPAColor = (gpa) => {
    const numGPA = parseFloat(gpa);
    if (numGPA >= 9) return "text-green-600";
    if (numGPA >= 8) return "text-blue-600";
    if (numGPA >= 7) return "text-yellow-600";
    if (numGPA >= 6) return "text-orange-500";
    if (numGPA > 0) return "text-red-500";
    return "text-gray-500";
  };

  const getClassification = (cgpa) => {
    const numCGPA = parseFloat(cgpa);
    if (numCGPA >= 9) return "First Class with Distinction";
    if (numCGPA >= 8) return "First Class";
    if (numCGPA >= 7) return "Second Class";
    if (numCGPA >= 6) return "Third Class";
    if (numCGPA >= 5) return "Pass";
    return "Need Improvement";
  };

  const getBgGradient = (cgpa) => {
    const numCGPA = parseFloat(cgpa);
    if (numCGPA >= 9) return "from-green-600 to-emerald-500";
    if (numCGPA >= 8) return "from-blue-600 to-indigo-500";
    if (numCGPA >= 7) return "from-yellow-500 to-orange-400";
    if (numCGPA >= 6) return "from-orange-500 to-red-400";
    return "from-blue-900 to-indigo-600";
  };

  if (!mobile) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 overflow-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-2">
        CGPA Calculator
      </h1>
      <p className="text-center text-gray-600 mb-4">
        B.E. CSE - 2022 Regulation | Mobile: {mobile}
      </p>

      {loading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Fetching your marks...</p>
        </div>
      )}

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-center">
          <p className="text-yellow-800">{error}</p>
          <div className="flex justify-center gap-2 mt-2">
            <button
              onClick={fetchMarks}
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
            >
              Retry Fetch
            </button>
            <button
              onClick={() => setShowManual(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Manual Calculator
            </button>
          </div>
        </div>
      )}

      {/* Manual Calculator */}
      {showManual && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-900">Manual CGPA Calculator</h2>
            <button
              onClick={() => setShowManual(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Enter credits and grades for each subject from your marks sheet below:
          </p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {manualEntries.map((entry, index) => (
              <div key={index} className="flex gap-2 items-center">
                <span className="text-gray-500 w-8">{index + 1}.</span>
                <input
                  type="number"
                  placeholder="Credits"
                  min="1"
                  max="10"
                  value={entry.credits}
                  onChange={(e) => {
                    const newEntries = [...manualEntries];
                    newEntries[index].credits = e.target.value;
                    setManualEntries(newEntries);
                  }}
                  className="border rounded px-2 py-1 w-20"
                />
                <select
                  value={entry.grade}
                  onChange={(e) => {
                    const newEntries = [...manualEntries];
                    newEntries[index].grade = e.target.value;
                    setManualEntries(newEntries);
                  }}
                  className="border rounded px-2 py-1"
                >
                  <option value="">Grade</option>
                  <option value="O">O (10)</option>
                  <option value="A+">A+ (9)</option>
                  <option value="A">A (8)</option>
                  <option value="B+">B+ (7)</option>
                  <option value="B">B (6)</option>
                  <option value="C">C (5)</option>
                  <option value="U">U (0)</option>
                </select>
                <button
                  onClick={() => {
                    const newEntries = manualEntries.filter((_, i) => i !== index);
                    setManualEntries(newEntries);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setManualEntries([...manualEntries, { credits: "", grade: "" }])}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              + Add Subject
            </button>
            <button
              onClick={() => {
                let tc = 0, tgp = 0;
                manualEntries.forEach(e => {
                  if (e.credits && e.grade && gradePoints[e.grade] !== undefined) {
                    const c = parseInt(e.credits);
                    tc += c;
                    tgp += c * gradePoints[e.grade];
                  }
                });
                setTotalCredits(tc);
                setTotalGradePoints(tgp);
                setOverallCGPA(tc > 0 ? (tgp / tc).toFixed(2) : 0);
              }}
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
            >
              Calculate CGPA
            </button>
          </div>
        </div>
      )}

      {/* Overall CGPA Card */}
      <div
        className={`bg-blue-900 rounded-xl p-6 mb-6 text-white shadow-lg`}
      >
        <div className="text-center">
          <p className="text-lg opacity-90">Overall CGPA</p>
          <p className="text-5xl font-bold my-2">{overallCGPA || "-"}</p>
          <p className="text-sm opacity-80">
            {overallCGPA > 0 ? getClassification(overallCGPA) : "Calculating..."}
          </p>
          <div className="mt-4 flex justify-center gap-8 text-sm">
            <div>
              <p className="opacity-75">Total Credits</p>
              <p className="text-xl font-bold">{totalCredits}</p>
            </div>
            <div>
              <p className="opacity-75">Total Grade Points</p>
              <p className="text-xl font-bold">{totalGradePoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Semester GPA Summary */}
      {Object.keys(semesterGPA).length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Semester-wise GPA
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(semesterGPA)
              .sort((a, b) => a - b)
              .map((sem) => (
                <div
                  key={sem}
                  className="bg-gray-50 rounded-lg p-4 text-center"
                >
                  <p className="text-sm text-gray-600">Semester {sem}</p>
                  <p
                    className={`text-2xl font-bold ${getGPAColor(
                      semesterGPA[sem]
                    )}`}
                  >
                    {semesterGPA[sem]}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Parsed Subjects Table */}
      {semesterData.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-900">
            Total Subjects ({semesterData.length} subjects)
            </h2>
            <p className="text-xs text-gray-500">Click credits to edit</p>
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-blue-50">
                <tr>
                  <th className="p-2 text-center w-16">Sem</th>
                  <th className="p-2 text-left">Code</th>
                  <th className="p-2 text-left">Subject Name</th>
                  <th className="p-2 text-center">Credits</th>
                  <th className="p-2 text-center">Grade</th>
                  <th className="p-2 text-center">Points</th>
                </tr>
              </thead>
              <tbody>
                {semesterData.map((subject, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="p-2 text-center font-bold text-blue-900">{subject.semester}</td>
                    <td className="p-2 font-mono text-xs">{subject.code}</td>
                    <td className="p-2 max-w-xs truncate" title={subject.name}>{subject.name}</td>
                    <td className="p-2 text-center">
                      {editingSubject === subject.code ? (
                        <input
                          type="number"
                          min="1"
                          max="10"
                          defaultValue={subject.credits}
                          className="w-12 border rounded px-1 py-0.5 text-center"
                          autoFocus
                          onBlur={(e) => updateSubjectCredits(subject.code, e.target.value, subject.name)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              updateSubjectCredits(subject.code, e.target.value, subject.name);
                            } else if (e.key === 'Escape') {
                              setEditingSubject(null);
                            }
                          }}
                        />
                      ) : (
                        <span
                          className="font-bold cursor-pointer hover:bg-blue-100 px-2 py-1 rounded"
                          onClick={() => setEditingSubject(subject.code)}
                          title="Click to edit credits"
                        >
                          {subject.credits}
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-center">
                      <span className={`px-2 py-1 rounded ${
                        subject.gradePoint >= 9 ? 'bg-green-100 text-green-800' :
                        subject.gradePoint >= 7 ? 'bg-blue-100 text-blue-800' :
                        subject.gradePoint >= 5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {subject.grade}
                      </span>
                    </td>
                    <td className="p-2 text-center">{subject.credits * subject.gradePoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CGPACalculator;
