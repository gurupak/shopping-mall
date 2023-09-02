export interface NavbarItemType {
  label: string;
  href: string;
  isDropDown: boolean;
  dropDownData?: Array<NavbarItemType>;
}

export const NavbarArray: Array<NavbarItemType> = [
  {
    label: "Female",
    href: "/product/female",
    isDropDown: true,
    dropDownData: [
      {
        label: "Dresses",
        href: "/product/female/dress",
        isDropDown: true,
      },
      {
        label: "T-Shirts",
        href: "/product/female/t-shirts",
        isDropDown: true,
      },
      {
        label: "Pents",
        href: "/product/female/pents",
        isDropDown: true,
      },
      {
        label: "Jackets",
        href: "/product/female/jackets",
        isDropDown: true,
      },
      {
        label: "Sweater",
        href: "/product/male/sweater",
        isDropDown: true,
      },
    ],
  },
  {
    label: "Male",
    href: "/product/male",
    isDropDown: true,
    dropDownData: [
      {
        label: "Shorts",
        href: "/product/male/shorts",
        isDropDown: true,
      },
      {
        label: "Shirts",
        href: "/product/male/shirts",
        isDropDown: true,
      },
      {
        label: "Pents",
        href: "/product/male/pents",
        isDropDown: true,
      },
      {
        label: "Jackets",
        href: "/product/male/jackets",
        isDropDown: true,
      },
      {
        label: "Sweater",
        href: "/product/male/sweater",
        isDropDown: true,
      },
    ],
  },
  {
    label: "Kids",
    href: "/product/kids",
    isDropDown: false,
  },
  {
    label: "All Products",
    href: "/products",
    isDropDown: false,
  },
];
