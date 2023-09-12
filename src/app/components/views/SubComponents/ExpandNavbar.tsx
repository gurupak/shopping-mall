import Link from "next/link";
import { HiOutlineChevronDown } from "react-icons/hi";
import { NavbarArray, NavbarItemType } from "../../utils/NavbarArraysAndTypes";
import { FC, useState } from "react";

const ExpandNavbar: FC<{
  item: NavbarItemType;
}> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isTimeOut, setTimeOut] = useState<boolean>(false)

  function handleExpand(){
    setIsExpanded(!isExpanded)
    setTimeout(() => {
        setTimeOut(!isTimeOut);
    }, 100)
  }
  return (
    <div>
      <li
        className={`${
          isExpanded ? "h-48" : "h-12"
        }  flex flex-col  list-none border duration-300`}
      >
        <div
          className="flex justify-between items-center  py-2 px-3 hover:bg-orange-500 rounded-md duration-300  "
          onClick={handleExpand}
        >
          <Link href={item.href}> {item.label}</Link>
          {item.isDropDown ? (
            <HiOutlineChevronDown
              size={15}
              className="mt-1 -rotate-90 group-hover:rotate-0 duration-300"
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col space-y-1 m-2">
          {isTimeOut &&
            item.dropDownData?.map((subItem: NavbarItemType, index: number) => (
              <Link
                key={index}
                className="hover:bg-gray-50 rounded-md py-1 px-5 duration-300"
                href={subItem.href}
              >
                {subItem.label}
              </Link>
            ))}
        </div>        
      </li>
    </div>
  );
};

export default ExpandNavbar;
