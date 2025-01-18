"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const Hero = () => {
  const [userInput, setUserInput] = useState("");
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    const msg = {
      role: "user",
      content: input,
    };
    setMessages(msg);

    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    console.log(workspaceId);
    router.push(`/workspace/` + workspaceId);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen relative px-4">
      {/* Background Image with Black Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: Colors.BACKGROUND, // Add the image path here
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay with transparency
        }}
      ></div>

      <div className="flex flex-col items-center gap-8 px-4 w-full max-w-3xl relative z-10">
        {/* Heading Section */}
        <div className="text-center">
          <h2 className="font-bold text-4xl sm:text-5xl leading-tight text-gray-900 dark:text-white">
            {Lookup.HERO_HEADING}{" "}
            <span className="font-extrabold text-blue-500">build?</span>
          </h2>
          <p className="text-gray-500 font-medium mt-3 text-lg sm:text-xl dark:text-gray-300">
            {Lookup.HERO_DESC}
          </p>
        </div>

        {/* Input Section */}
        <div className="p-6 border shadow-lg rounded-2xl w-full  border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <textarea
              placeholder={Lookup.INPUT_PLACEHOLDER}
              onChange={(event) => setUserInput(event.target.value)}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-gray-900 dark:text-white"
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
        <div className="flex flex-wrap gap-4 w-full items-center justify-center">
          {Lookup?.SUGGSTIONS.map((suggestion, index) => (
            <h2
              key={index}
              onClick={() => onGenerate(suggestion)}
              className="p-2 px-4 border rounded-full text-gray-600 cursor-pointer bg-black hover:bg-blue-500 hover:text-white transition-all shadow-md  dark:text-gray-300 dark:hover:bg-blue-500"
            >
              {suggestion}
            </h2>
          ))}
        </div>
      </div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
};

export default Hero;
