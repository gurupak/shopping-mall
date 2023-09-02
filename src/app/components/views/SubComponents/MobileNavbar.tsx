import { NavbarArray, NavbarItemType } from "../../utils/NavbarArraysAndTypes";
import ExpandNavbar from "./ExpandNavbar";

const MobileNavbar = () => {
  return (
    <div className="w-full px-6 py-4 bg-gray-100">
      {NavbarArray.map((item: NavbarItemType, index: number) => {
        return <ExpandNavbar item={item} key={index} />;
      })}
    </div>
  );
};

export default MobileNavbar;
