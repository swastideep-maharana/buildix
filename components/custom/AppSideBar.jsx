import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";

const AppSideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <Image
          src="/logo.png"
          alt="Logo"
          width={30}
          height={30}
          className="rounded-full"
        />
        <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 mt-5">
          <MessageCircleCode /> Start New Chart
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-5">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
