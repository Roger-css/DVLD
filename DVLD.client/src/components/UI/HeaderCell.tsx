import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
type props = {
  title: string;
  SubList: { title: string; link: string }[] | null;
  focused: boolean;
  handleClick: (title: string) => void;
};

function HeaderCell({ title, SubList, focused, handleClick }: props) {
  const CellRef = useRef<HTMLLIElement>(null);
  const SubListRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.endsWith("people") && title === "People") {
      handleClick(title);
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
        handleClick(title);
      }}
      className={`relative h-8 px-5 pt-1 ml-8 text-white transition-colors cursor-pointer select-none headerCell rounded-3xl ${
        focused ? "headerCellClicked" : null
      }`}
    >
      {title}
      {SubList && (
        <ul
          className={`w-10 -mt-2 bg-white pointer-events-none HeaderCellUl ${
            focused ? "ShowingHeaderCellUl" : null
          }`}
          ref={SubListRef}
        >
          {SubList.map((v, i) => {
            return (
              <li key={i} className="">
                {v.title}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default HeaderCell;
