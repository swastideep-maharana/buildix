import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div className="p-4 flex justify-between items-center shadow-md rounded-lg transition-all duration-500">
      <Image
        src="/logo.png"
        alt="Logo"
        width={40}
        height={40}
        className="transition-transform duration-300 hover:scale-110"
      />
      {!userDetail?.name && (
        <div className="flex gap-5">
          <Button
            variant="ghost"
            className="text-white-500 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Sign In
          </Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
