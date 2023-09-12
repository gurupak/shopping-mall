"use client";
import Image from "next/image";
import { NavbarArray, NavbarItemType } from "../../utils/NavbarArraysAndTypes";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { HiOutlineChevronDown } from "react-icons/hi";
import DropDown from "../SubComponents/DropDown";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import MobileNavbar from "../SubComponents/MobileNavbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CartState from "../SubComponents/CartState";
import { UserButton } from "@clerk/nextjs";
import ContextWrapper from "@/context/context";

const Navbar = ({ userData}: { userData: string | null}) => {
  const router = useRouter();
  // const qty = contextCart.cart.map()
  const [searchText, setSearchText] = useState("");
  const [isNavbarOpen, setNavbarOpen] = useState<boolean>(false);
  const handleSearchKeyDown = (e: any) => {
    // console.log(e.key, e.keyCode);
    if (e.key === "Enter" && e.keyCode === 13) {
      router.push(`/search/${searchText}`);
    }
  };
  return (
    <ContextWrapper>
      <div className="backdrop-blur-lg bg-white">
        {/* sticky top-0 */}
        <div className=" py-6 flex justify-between items-center space-x-12">
          <div className="w-36 flex-shrink-0">
            <Link href={"/"}>
              <Image
                src={"/images/logo.webp"}
                alt="Dine"
                height={500}
                width={500}
              />
            </Link>
          </div>
          <div className="hidden lg:flex justify-between items-center w-full">
            <ul className="flex space-x-3 lg:space-x-4 font-medium text-lg z-50">
              {NavbarArray.map((item: NavbarItemType, index: number) => (
                <li
                  key={index}
                  className="flex items-center relative px-3 py-1 hover:bg-gray-100 cursor-pointer group rounded-sm"
                >
                  <Link href={item.href}>{item.label}</Link>
                  {item.isDropDown ? (
                    <HiOutlineChevronDown
                      size={15}
                      className="mt-0 -rotate-90 group-hover:rotate-0 duration-300"
                    />
                  ) : (
                    ""
                  )}
                  {item.isDropDown && (
                    <div
                      className={`invisible group-hover:visible left-0 absolute top-8 py-2 px-6 bg-gray-100 font-light min-w-[7.8rem]`}
                    >
                      <DropDown item={item} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="border flex items-center text-gray-600 px-1 rounded-md">
              <Link href={`/search/${searchText}`}>
                <BiSearch />
              </Link>
              <input
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                type="text"
                className="focus:outline-none w-80 pl-1 pr-5 py-1"
                placeholder="Search in the store"
              />
            </div>
            <CartState />
            <div className="flex flex-col items-center justify-center space-y-1">
              <UserButton afterSignOutUrl="/" />
              {userData && (
                <Link href={"/profile"}>
                  <p>Profile</p>
                </Link>
              )}
            </div>
          </div>
          <div className="cursor-pointer flex lg:hidden">
            <label className="btn btn-circle swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                checked={isNavbarOpen}
                onChange={() => setNavbarOpen(!isNavbarOpen)}
              />

              {/* hamburger icon */}
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* close icon */}
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
            {/* {isNavbarOpen ? (
              <div className="flex lg:hidden">
                <IoClose size={28} />
              </div>
            ) : (
              <div className="flex lg:hidden">
                <GiHamburgerMenu size={25} />
              </div>
            )} */}
          </div>
        </div>
        {isNavbarOpen && <MobileNavbar />}
      </div>
    </ContextWrapper>
  );
};

export default Navbar;
