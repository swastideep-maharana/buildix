"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";

const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);

  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar(); // Sidebar toggle function
  const UpdateTokens = useMutation(api.users.UpdateToken);

  useEffect(() => {
    if (id) GetWorkspaceData();
  }, [id]);

  const GetWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        workspaceId: id,
      });
      setMessages(result?.messages || []); // Ensure messages is always an array
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(() => {
    if (Array.isArray(messages) && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    setLoading(true);
    try {
      const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
      const result = await axios.post("/api/ai-chat", {
        prompt: PROMPT,
      });

      const aiResp = {
        role: "ai",
        content: result.data.result,
      };
      const updatedMessages = [...messages, aiResp];

      setMessages((prev) => [...prev, aiResp]);

      await UpdateMessages({
        messages: updatedMessages,
        workspaceId: id,
      });

      const token =
        Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
      await UpdateTokens({
        user: userDetail?._id, // Corrected to 'user' instead of 'userId'
        token: token, // Ensure token is a valid number
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  const onGenerate = (input) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  return (
    <div className="relative h-[85vh] flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-scroll scrollbar-hide px-5">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-2 items-center leading-7"
              style={{
                backgroundColor: Colors.BACKGROUND,
              }}
            >
              {msg?.role === "user" && (
                <Image
                  src={userDetail?.picture}
                  alt="User"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
              <ReactMarkdown className="flex flex-col">
                {msg?.content || "No content available"}
              </ReactMarkdown>
            </div>
          ))
        ) : (
          <div className="p-3 text-gray-500 text-center">No messages yet.</div>
        )}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-center"
            style={{ backgroundColor: Colors.BACKGROUND }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="flex gap-2 items-center">
        <div
          className="p-6 border shadow-lg rounded-2xl max-w-xl w-full"
          style={{
            backgroundColor: Colors.BACKGROUND,
          }}
        >
          <div className="flex items-center gap-3 relative">
            <textarea
              placeholder={Lookup.INPUT_PLACEHOLDER}
              value={userInput}
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
        </div>
      </div>

      {/* User Profile Image Below the Input Box with Text */}
      <div className="flex justify-center mt-4 items-center gap-2">
        {userDetail && (
          <>
            <Image
              src={userDetail?.picture}
              alt="User"
              width={45}
              height={45}
              className="rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={() => toggleSidebar()} // Close the sidebar when the image is clicked
            />
            <span
              className="text-sm text-gray-200 cursor-pointer hover:underline"
              onClick={() => toggleSidebar()}
            >
              Click to open sidebar
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatView;
