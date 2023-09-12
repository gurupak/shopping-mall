import { UserButton } from "@clerk/nextjs";
import { NavbarArray, NavbarItemType } from "../../utils/NavbarArraysAndTypes";
import ExpandNavbar from "./ExpandNavbar";
import { BsCart3 } from "react-icons/bs";
import Link from "next/link";

const MobileNavbar = () => {
  return (
    <div className="w-full px-6 py-4 bg-gray-100 visible lg:hidden">
      {NavbarArray.map((item: NavbarItemType, index: number) => {
        return <ExpandNavbar item={item} key={index} />;
      })}
      <div className="flex justify-end gap-2 items-center">
        <Link href={"/cart"}>
          <div className="flex flex-col space-y-1 m-2 bottom-1 border-gray-400 items-center justify-center">
            <BsCart3 size={32} />
            <p>Cart</p>
          </div>
        </Link>
        <div className="flex flex-col space-y-1 m-2 justify-center items-center">
          <UserButton />{" "}
          <p>
            <Link href={"/profile"}>My Profile</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
