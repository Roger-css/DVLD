import { useState } from "react";
import HeaderCell from "../components/UI/HeaderCell";

function Header() {
  const [LiComps, setLiComps] = useState([
    {
      Title: "Application",
      SubList: [
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
      ],
      focused: false,
    },
    { Title: "People", SubList: null, focused: false },
    {
      Title: "Drivers",
      SubList: [
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
      ],
      focused: false,
    },
    {
      Title: "Users",
      SubList: [
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
      ],
      focused: false,
    },
    {
      Title: "Account Settings",
      SubList: [
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
      ],
      focused: false,
    },
  ]);
  const handleClick = (title: string) => {
    setLiComps((prev) => {
      return prev.map((item) => {
        if (item.Title === title) {
          item.focused = true;
        } else {
          item.focused = false;
        }
        return item;
      });
    });
  };
  return (
    <div className="flex items-center bg-blue-500 shadow-lg h-14 shadow-gray-400/65">
      <div className="mx-20 text-lg text-neutral-50">LOGO</div>
      <ul className="flex items-center justify-start h-full ml-10">
        {LiComps.map((v) => {
          return (
            <HeaderCell
              title={v.Title}
              focused={v.focused}
              handleClick={handleClick}
              SubList={v.SubList}
              key={v.Title}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Header;
