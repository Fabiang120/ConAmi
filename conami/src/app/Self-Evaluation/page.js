"use client";
import Sidebar from "../Components/sidebar.js";
import BottomNav from "../Components/BottomNav.js";
import AgreeScaleQuestion from "../Components/Agree.js";
import React, { useEffect, useState, useRef } from "react";

export default function SelfEvaluation() {
const [answers, setAnswers] = useState({});

    const handleChange = (e) => {
        setAnswers({
            ...answers,
            [e.target.name]: e.target.value
        });
    };


    return (
        <div className="grid grid-cols-12 min-h-screen">
            <div className="hidden md:block md:col-span-3 lg:col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-12 md:col-span-9 lg:col-span-10 bg-[#f0e1d1] font-sans pb-16">
                <h1 className="text-3xl py-4 font-semibold mb-6 justify-center items-center leading-tight tracking-tight flex">
                    Self-Evaluation
                </h1>
                <div className="w-full max-w-5xl mx-auto space-y-8"> 
                    {/*Question 1 */}
                    <AgreeScaleQuestion
                        question="Compared to the last evaluation, I feel more confident speaking Spanish/English:"
                        name="confidence"
                        value={answers.confidence}
                        onChange={handleChange}
                    />
                    {/*Question 2 */}
                    <AgreeScaleQuestion
                        question="Compared to last evaluation, I feel more fluent in the language I am learning:"
                        name="fluency"
                        value={answers.fluency}
                        onChange={handleChange}
                    />
                    {/*Question 3 */}
                    <AgreeScaleQuestion
                        question="I used a broader range of vocabulary than I did last evaluation:"
                        name="vocabulary"
                        value={answers.vocabulary}
                        onChange={handleChange}
                    />
                    {/*Question 4 */}
                    <AgreeScaleQuestion
                        question="I asked my partner follow-up questions to engage in conversation:"
                        name="conversation"
                        value={answers.conversation}
                        onChange={handleChange}
                    />
                    {/*Question 5 */}
                    <AgreeScaleQuestion
                        question="I adequately kept the conversation going:"
                        name="adequateconversation"
                        value={answers.adequateconversation}
                        onChange={handleChange}
                    />
                    {/*Question 6 */}
                    <AgreeScaleQuestion
                        question="I asked clarification questions when I did not understand my partner:"
                        name="clarification"
                        value={answers.clarification}
                        onChange={handleChange}
                    />
                    {/*Question 7 */}
                    <AgreeScaleQuestion
                        question="I spoke in the language I want to learn the majority of the time:"
                        name="majoritylanguage"
                        value={answers.majoritylanguage}
                        onChange={handleChange}
                    />
                    {/*Question 8 */}
                    <AgreeScaleQuestion
                        question="I felt more motivated to continue learning the language by speaking to a native speaker:"
                        name="motivation"
                        value={answers.motivation}
                        onChange={handleChange}
                    />
                    {/*Question 9 */}
                    <AgreeScaleQuestion
                        question="I understood the main points of the conversation:"
                        name="understanding"
                        value={answers.understanding}
                        onChange={handleChange}
                    />
                    {/*Question 10 */}
                    <p className="text-lg font-medium">What feels easier now than last evaluation?</p>
                    <textarea
                        name="easierNow"
                        value={answers.easierNow || ""}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg min-h-[120px]"
                        placeholder="Describe what feels easier now..."
                    />
                    {/*Question 11 */}
                    <p className="text-lg font-medium">What still frustrates me?</p>
                    <textarea
                        name="frustrations"
                        value={answers.frustrations || ""}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg min-h-[120px]"
                        placeholder="Describe what still frustrates you..."
                    />
                    {/*Question 12 */}
                    <p className="text-lg font-medium">Do I translate less in my head than I did in my last evaluation?</p>
                    <textarea
                        name="translations"
                        value={answers.translations || ""}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg min-h-[120px]"
                        placeholder="Describe how you translate less in your head now..."
                    />
                    {/*Question 13 */}
                    <p className="text-lg font-medium">What communication strategies have been working?</p>
                    <textarea
                        name="communicationStrategies"
                        value={answers.communicationStrategies || ""}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg min-h-[120px]"
                        placeholder="Describe the communication strategies that have been working..."
                    />
                    {/*Question 14 */}
                    <p className="text-lg font-medium">When I did not know a word, what did I do?</p>
                    <textarea
                        name="wordlookup"
                        value={answers.wordlookup || ""}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg min-h-[120px]"
                        placeholder="Describe what you did when you didn't know a word..."
                    />
                    {/*Question 15 */}
                    <p className="text-lg font-medium">If I met a stranger who spoke in the language you are learning, would you feel comfortable having a 10 minute conversation with them? Why or why not?</p>
                    <textarea
                        name="strangerConversation"
                        value={answers.strangerConversation || ""}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg min-h-[120px]"
                        placeholder="Describe how you would feel if you met a stranger who spoke the language you are learning..."
                    />
                    {/*Question 16 */}
                    <p className="text-lg font-medium">What are your goals for the next evaluation?</p>
                    <textarea
                        name="goals"
                        value={answers.goals || ""}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg min-h-[120px]"
                        placeholder="Describe your goals for the next evaluation..."
                    />
                </div>
                <div className="flex justify-center pt-6">
                    <button className="px-6 py-3 bg-[#63372c] text-white rounded-lg hover:bg-[#4b2619] transition-colors">
                        Submit
                    </button>
                </div>
            </div>
            <BottomNav />
        </div>
    )
}