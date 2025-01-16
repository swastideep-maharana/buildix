import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";

const Header = () => {
  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
      <div className="flex gap-5">
        <Button variant="ghost">Sign In</Button>
        <Button className="bg-blue-400">Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
