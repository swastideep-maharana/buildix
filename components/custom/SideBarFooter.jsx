import React from "react";
import { Button } from "../ui/button";
import {
  FaCog,
  FaQuestionCircle,
  FaDollarSign,
  FaSignOutAlt,
} from "react-icons/fa"; // Correct icon imports
import { useRouter } from "next/navigation";

const SideBarFooter = () => {
  const router = useRouter();
  const options = [
    {
      name: "Settings",
      icon: <FaCog />, // Use the imported icons
    },
    {
      name: "Help Center",
      icon: <FaQuestionCircle />,
    },
    {
      name: "My Subscription",
      icon: <FaDollarSign />,
      path: "/pricing",
    },
    {
      name: "Sign Out",
      icon: <FaSignOutAlt />,
    },
  ];

  const onOptionClick = (option) => {
    router.push(option.path);
  };

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          variant="ghost"
          onClick={() => onOptionClick(option)}
          className="w-full flex justify-start my-3"
          key={index}
        >
          {option.icon} {/* Render the icon component */}
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
