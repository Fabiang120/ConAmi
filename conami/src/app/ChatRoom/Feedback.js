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
        <div className="w-full max-w-5xl mx-auto space-y-8"> 
            <AgreeScaleQuestion
            question="My partner expressed themselves clearly:"
            name="express"
            value={answers.express}
            onChange={handleChange}
            />
            <AgreeScaleQuestion
            question="My partner’s fluency has improved:"
            name="fluency"
            value={answers.fluency}
            onChange={handleChange}
            />
            <AgreeScaleQuestion
            question="My partner seems more confident speaking in their learned language:"
            name="confidence"
            value={answers.confidence}
            onChange={handleChange}
            />
            <AgreeScaleQuestion
            question="Our conversation had a natural flow:"
            name="flow"
            value={answers.flow}
            onChange={handleChange}
            />
        </div>
        <p className="mt-6 text-lg">Area(s) I noticed my partner has improved in:</p>
        <textarea
          placeholder="Write feedback..."
          className="w-full h-28 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#63372C]"
        />
        <p className="mt-4 text-lg">One strength I noticed in my partner:</p>
        <textarea
          placeholder="Write feedback..."
          className="w-full h-28 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#63372C]"
        />
        <p className="mt-4 text-lg">Suggestion(s) for my partner:</p>
        <textarea
          placeholder="Write feedback..."
          className="w-full h-28 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#63372C]"
        />
        <p className="mt-4 text-lg">Talk about an area both you and your partner could work on:</p>
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