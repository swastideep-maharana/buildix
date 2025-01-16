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
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
      <h2 className="font-bold text-4xl">
        {Lookup.HERO_HEADING}{" "}
        <span className="font-extrabold  text-4xl text-blue-300">build?</span>
      </h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
      <div
        className="p-5 border rounded-xl max-w-xl w-full mt-3"
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
            className="outline-none bg-transparent w-full h-32 mx-h-56 resize-none"
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-10 w-10 rounded-full cursor-pointer"
            />
          )}
        </div>
        <div>
          <Link className="h-5 w-5" />
        </div>
      </div>

      <div className="flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(suggestion)}
            className="p-1 px-2 border rounded-full text-s cursor-pointer hover:bg-gray-200 hover:text-gray-700"
          >
            {suggestion}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default Hero;
