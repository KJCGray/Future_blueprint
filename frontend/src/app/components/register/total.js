"use client";
import React, { useState } from "react";
import Signin from "./signin";
import Signup from "./signup";
const total = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showSignUp, setShowSignUp] = useState(false);
  function signInTrigger() {
    setShowSignUp(false);
  }
  function signUpTrigger() {
    setShowSignUp(true);
  }
  return (
    <div className="w-1/4 rounded bg-[#fdf8f0] h-2/3 drop-shadow-2xl p-8">
      <div className="flex justify-center text-[#a38d80] mt-4 text-2xl">
        <a>Welcome!</a>
      </div>
      <div className="flex justify-center h-12 mt-8">
        <button
          className={` text-[#a38d80] m-2 hover:border-[#f4b894] ${
            !showSignUp ? "border-b-2 border-[#f4b894] " : ""
          }`}
          onClick={signInTrigger}
        >
          Sign In
        </button>
        <button
          className={`ml-10 text-[#a38d80] m-2 hover:border-[#f4b894] ${
            showSignUp ? "border-b-2 border-[#f4b894] " : ""
          }`}
          onClick={signUpTrigger}
        >
          Sign Up
        </button>
      </div>
      {showSignUp ? <Signup /> : <Signin />}
    </div>
  );
};

export default total;
