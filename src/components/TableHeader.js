import React, { useContext, useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillCaretDown } from "react-icons/ai";
import filterImage from "../assets/filterImage.png";
import { GlobalContext } from "../contexts/globalState";
import "../styles/tableHeader.css";

const TableHeader = (props) => {
  const { locations } = useContext(GlobalContext);
  const [location, setLocation] = useState("");
  return (
    <div className="table-header" style={props.style}>
      <h2>{props.title}</h2>

      <div className="container">
        <div
          className="center-container"
          style={{ width: "100%", justifyContent: "right" }}
        >
          <div className="center-container">
            <div
              className="location"
              style={{
                height: "fit-content",
                width: "fit-content",
                borderRadius: 25,
              }}
            >
              {/* <HiLocationMarker className="icon" /> Location: All
              <AiFillCaretDown className="icon small" /> */}
              <label>Branch:</label>
              <select
                className="block p-2 m-1 max-w-sm text-sm outline-none"
                style={{
                  backgroundColor: "rgba(52, 52, 52, 0)",
                  border: "0 !important",
                  boxShadow: "0 !important",
                  border: "0 !important",
                  cursor: "pointer",
                }}
                onChange={(e) => {
                  if (e.target.value == "All") {
                    setLocation("");
                  } else {
                    setLocation(e.target.value);
                  }
                }}
              >
                <option>All</option>
                {locations.map((val, ind) => (
                  <option>{val.data.branch}</option>
                ))}
              </select>
            </div>
            <img src={filterImage} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
