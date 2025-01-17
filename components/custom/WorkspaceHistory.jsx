"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

const WorkspaceHistory = () => {
  const { userDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspacelist, setWorkspaceList] = useState([]);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    if (userDetail) {
      GetAllWorkspace();
    }
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    try {
      const result = await convex.query(api.workspace.GetAllWorkspace, {
        userId: userDetail._id,
      });
      setWorkspaceList(result || []);
    } catch (error) {
      console.error("Failed to fetch workspaces:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="font-medium text-lg">Your Charts</h2>
      <div className="mt-4">
        {workspacelist.length > 0 ? (
          workspacelist.map((workspace) => (
            <Link href={"/workspace/" + workspace?._id} key={workspace._id}>
              <h2
                onClick={toggleSidebar}
                className="text-sm text-gray-400 mt-2 font-light
              hover:text-white cursor-pointer"
              >
                {workspace?.messages?.[0]?.content || "No content available"}
              </h2>
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500 mt-2">No workspaces found.</p>
        )}
      </div>
    </div>
  );
};

export default WorkspaceHistory;
