"use client";
import React from "react";
import Link from "next/link";

//after a user signs up, they will be redirected to this page. They must click the "I agree" box before creating an account

export default function TermsAndServices() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0e1d1]">
      <div className="w-full max-w-3xl shadow-2xl rounded-md p-10 bg-white">
        <h1 className="text-lg font-medium text-[#63372c]">TERMS AND SERVICES</h1>
        <h2 className="mt-2">
          PLEASE ENSURE YOU HAVE READ AND UNDERSTOOD BEFORE PROCEEDING.
        </h2>
        <div className="w-full h-80 mt-4 p-4 border rounded overflow-y-scroll text-sm space-y-3">
            <p>Our application requires users to be a minimum age of 18 years old.</p>
            <p>This eliminates the exposure to safety violations and the endangerment of minors.</p>
            <p>If your account is flagged for suspicion of being a minor, your account will be placed on review, where you cannot access your account until we finalize a conclusion.</p>
            <p>If we find sufficient evidence that supports you being under 18 years of age, your account will be suspended.</p>
            <p>Otherwise, your account will be taken off of review and be allowed to freely use your account.</p>
            <p>If you suspect another user is a minor, you are required to report their account so we can intervene immediately. 
                Please report their account and provide evidence for your claim of them being a minor. 
                As a user, you agree that you are 18+ and you agree to report any accounts you suspect being younger than 18 years old. 
                If you are found engaging in conversations with minors where you were aware of their age and refused to report it, we have the right to permanently suspend your account.</p>
            <p>By creating an account and agreeing to our terms and services, you agree to abide by our rules to maintain a respectful environment. 
                As the creators of ConAmi, we pride ourselves in creating a safe environment for every user.</p>
        </div>
        <h2 className="mt-2">
          By clicking this box and creating an account, you confirm that you are at least 18 years old and have read and agree to our Terms and Services. 

        </h2>
      </div>
    </div>
  );
}