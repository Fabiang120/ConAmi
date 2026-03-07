import React from "react";

export default function Agree({ question, name, value, onChange }) {
    const options = [
        "Strongly Agree",
        "Agree",
        "Neutral",
        "Disagree",
        "Strongly Disagree"
    ];

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-medium">{question}</h2>

            <ul className="space-y-1">
                {options.map((option) => (
                    <li key={option}>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name={name}
                                value={option}
                                checked={value === option}
                                onChange={onChange}
                            />
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}