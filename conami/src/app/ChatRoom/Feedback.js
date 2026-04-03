import AgreeScaleQuestion from "../Components/Agree.js";
import React, { useEffect, useState, useRef } from "react";

export default function Feedback({ onClose}){
    const [answers, setAnswers] = useState({});
    
        const handleChange = (e) => {
            setAnswers({
                ...answers,
                [e.target.name]: e.target.value
            });
        };
    return (
        <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl w-[400px] max-w-[90%] max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="absolute top-4 right-4 text-gray-500 cursor-pointer"
          onClick={onClose}
        >
          X
        </button>
        <div className="overflow-y-auto flex-1 p-6 pr-3
        [scrollbar-width:none] 
        [-ms-overflow-style:none] 
        [&::-webkit-scrollbar]:hidden">
        <h2 className="text-xl font-semibold mb-4">
          Send Feedback
        </h2>
        <p className="mt-6 text-lg">Area(s) our dialogue can improve on:</p>
        <textarea
          placeholder="Write feedback..."
          className="w-full h-28 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#63372C]"
        />
        <p className="mt-4 text-lg">One strength I noticed in my partner:</p>
        <textarea
          placeholder="Write feedback..."
          className="w-full h-28 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#63372C]"
        />
        <button
          className="mt-4 w-full bg-[#63372C] text-white py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
          onClick={onClose}
        >
          Submit
        </button>
        </div>
      </div>
    </div>
  );
}