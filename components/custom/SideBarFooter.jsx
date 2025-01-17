import React from "react";
import { Button } from "../ui/button";

const SideBarFooter = () => {
  const options = [
    {
      name: "Settings",
      icon: "Settings",
    },
    {
      name: "Help Center",
      icon: "HelpCircle",
    },
    {
      name: "Sign Out",
      icon: "Logout",
    },
  ];
  return (
    <div className="p-2 mb-10 ">
      {options.map((option, index) => (
        <Button
          variant="ghost"
          className="w-full flex justify-start my-3"
          key={index}
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
