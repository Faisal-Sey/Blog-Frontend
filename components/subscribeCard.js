import React from "react";
import { useState } from "react";
import axios from "axios";

export default ({ theme }) => {
  const [email, setEmail] = useState("");
  const [fullName,setFullName]= useState("")
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async () => {
    setState("LOADING");
    setErrorMessage(null);
    try {
      const response = await axios.post("/api/newsletter", { email,fullName });
      setState("SUCCESS");
    } catch (e) {
      setErrorMessage(e.response?.data?.error);
      setState("ERROR");
    }
  };

  return (
    <div
      className={`bg-card-${theme} ${theme} my-8 lg:mt-0 mb-8 p-4 rounded-lg subscribe-card`}
    >
      <div className="text-white font-bold dark:text-white leading-normal text-xl lg:text-3xl">
        Get updated with the best news about events in your inbox
      </div>
      <div style={{margin: "60px 0"}}>
        <div className="my-4 px-2 lg:px-4">
          <input
            type="text"
            placeholder="Your name"
            className="p-2 lg:p-4 w-full dark:bg-black"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
          />
        </div>
        <div className="my-10 px-2 lg:px-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 lg:p-4 w-full dark:bg-black"
          />
        </div>
      </div>
      <div className="my-4 lg:my-8 px-2 lg:px-4">
        <button
          className={`bg-white w-full p-2 lg:p-4 rounded dark:bg-black text-${theme} text-xl font-bold text-center ${
            state === "LOADING" ? "button-gradient-loading" : ""
          }`}
          type="button"
          disabled={state === "LOADING"}
          onClick={subscribe}
        >
          {" "}
          Subscribe
        </button>
      </div>
      {state === "ERROR" && (
        <p className="w-1/2 mt-2 text-lg text-red-500">{errorMessage}</p>
      )}
      {state === "SUCCESS" && (
        <p className="w-1/2 mt-2 text-lg text-green-600">Success!</p>
      )}
    </div>
  );
};
