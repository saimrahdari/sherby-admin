import { IoCloseCircleSharp, IoPencil } from "react-icons/io5";
import "../styles/modal1.css";

const Modal1 = (props) => {
  const classNames = props.show ? "modal show" : "modal hide";

  return (
    <div
      className={classNames}
      onClick={(e) =>
        e.target.classList[0] === "modal" ? props.hideModal() : null
      }
    >
      <div className="modal-content" style={props.contentStyle}>
        <div className="modal-header">
          
          <IoCloseCircleSharp   style={{cursor:'pointer'}} onClick={props.hideModal} className="icon" />
        </div>
        <div className="children-container">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal1;
