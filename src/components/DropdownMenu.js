import { AiFillCaretDown } from "react-icons/ai";
import "../styles/dropdownMenu.css";

const DropdownMenu = (props) => {
  return (
    <div className="dropdown-menu">
      <div className="title">
        {props.title}
        <AiFillCaretDown className="icon" />
      </div>
      <div className="dropdown-menu-content">{props.children}</div>
    </div>
  );
};

export default DropdownMenu;
