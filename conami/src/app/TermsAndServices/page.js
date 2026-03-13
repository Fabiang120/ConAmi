"use client";
import React from "react";
import Link from "next/link";

//after a user signs up, they will be redirected to this page. They must click the "I agree" box before creating an account

export default function TermsAndServices() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0e1d1]">
      <div className="w-full max-w-3xl shadow-2xl rounded-md p-10 bg-white">
        <h1 className="text-lg font-medium color-[#63372c]">TERMS AND SERVICES</h1>
        <h2 className="mt-2">
          PLEASE ENSURE YOU HAVE READ AND UNDERSTOOD BEFORE PROCEEDING.
        </h2>
        <textarea
          readOnly
          className="w-full h-80 mt-4 p-3 border rounded"
        >
        Our application requires users to be a minimum age of 18 years old. 
        </textarea>
        <h2 className="mt-2">
          By clicking this box and creating an account, you confirm that you are at least 18 years old and have read and agree to our Terms and Services.
        </h2>
      </div>
    </div>
  );
}