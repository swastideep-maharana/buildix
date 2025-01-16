"use client";
import { MessagesContext } from "@/context/MessagesContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";

const Hero = () => {
  const [userInput, setUserInput] = useState();

  const { messages, setMessages } = useContext(MessagesContext);
  const onGenerate = (input) => {
    setMessages({
      role: "user",
      content: input,
    });
  };

  return (
    <div className="relative flex flex-col items-center mt-36 xl:mt-52 gap-8 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 animate-light-rays"></div>

      {/* Heading Section */}
      <div className="text-center">
        <h2 className="font-bold text-4xl sm:text-5xl leading-tight">
          {Lookup.HERO_HEADING}{" "}
          <span className="font-extrabold text-blue-500">build?</span>
        </h2>
        <p className="text-gray-500 font-medium mt-3 text-lg sm:text-xl">
          {Lookup.HERO_DESC}
        </p>
      </div>

      {/* Input Section */}
      <div
        className="p-6 border shadow-lg rounded-2xl max-w-xl w-full"
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className="flex items-center gap-3">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 text-white p-2 h-10 w-10 rounded-full cursor-pointer hover:bg-blue-600 transition-transform transform hover:scale-110"
            />
          )}
        </div>
        <div className="flex justify-end mt-3">
          <Link className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="flex flex-wrap gap-4 max-w-2xl items-center justify-center">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(suggestion)}
            className="p-2 px-4 border rounded-full text-gray-600 cursor-pointer bg-gray-100 hover:bg-blue-500 hover:text-white transition-all shadow-md"
          >
            {suggestion}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default Hero;
