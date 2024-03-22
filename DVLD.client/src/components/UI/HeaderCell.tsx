import { ReactNode, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
type props = {
  title: string;
  SubList: { title: string | ReactNode; link?: string }[] | null;
  focused: boolean;
  handleClick: () => void;
  className?: string;
  focusedClassName?: string;
  activeLi: string | undefined;
};

const HeaderCell = ({
  title,
  SubList,
  focused,
  className,
  handleClick,
  focusedClassName,
  activeLi,
}: props) => {
  const CellRef = useRef<HTMLLIElement>(null);
  const SubListRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      (location.pathname.endsWith("people") && title === "People") ||
      (location.pathname.endsWith("drivers") && title === "Drivers") ||
      (location.pathname.endsWith("users") && title === "Users")
    ) {
      handleClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <li
      ref={CellRef}
      onClick={() => {
        if (title === "People") {
          navigate("people");
        }
        if (title === "Drivers") {
          navigate("drivers");
        }
        if (title === "Users") {
          navigate("users");
        }
        if (activeLi !== "Application") {
          handleClick();
        }
      }}
      className={`relative h-8 px-5 pt-1 text-white transition-colors cursor-pointer select-none headerCell rounded-3xl ${
        focused ? "headerCellClicked" : null
      }`}
    >
      {title}
      {SubList && (
        <ul
          className={`-mt-2 bg-white HeaderCellUl ${className} ${
            focused ? "ShowingHeaderCellUl " + focusedClassName : null
          }`}
          ref={SubListRef}
        >
          {SubList.map((v, i) => {
            return <li key={i}>{v.title}</li>;
          })}
        </ul>
      )}
    </li>
  );
};

export default HeaderCell;
