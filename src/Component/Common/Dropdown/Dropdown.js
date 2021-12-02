import React from "react";
import "./dropdown.style.scss";
export default function Dropdown({
  list = [],
  selected,
  changeSelected = () => {},
  style = {},
}) {
  const [openList, setOpenList] = React.useState(false);
  const [selectedLocal, setSelectedLocal] = React.useState(selected);

  const node = React.useRef();
  const handleClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
    } else {
      setOpenList(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div style={{ ...style }} ref={node} className="common-dropdown">
      <div onClick={() => setOpenList(!openList)} className="dropdown-selected">
        <span>
          {!selected && !selectedLocal
            ? "Select"
            : selected?.name || selectedLocal?.name}
        </span>
        <img src="https://img.icons8.com/ios/48/000000/expand-arrow--v2.png" />
      </div>
      <ul
        style={openList ? { height: `${list.length * 40}px` } : { height: 0 }}
        className={`dropdown-list ${openList ? "open-list" : ""}`}
      >
        {list.map((obj) => (
          <li
            onClick={() => {
              setSelectedLocal(obj);
              changeSelected(obj);
              setOpenList(false);
            }}
          >
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
