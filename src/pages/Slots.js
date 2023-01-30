import React, { useEffect, useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import TableHeader from "../components/TableHeader";
import "../styles/slots.css";

import filterImage from "../assets/filterImage.png";
import removeImage from "../assets/removeImage.png";
import addImage from "../assets/addImage.png";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import { useGlobalState } from "../contexts/globalState";
import { async } from "@firebase/util";
import LoadingSpinner from "../components/LoadingSpinner";

const Slots = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [location, setLocation] = useState("");
  const { stylists, updateStylist, deleteStylist } = useGlobalState();
  const [selected, setselected] = useState(["Select Stylist"]);
  const [selected1, setselected1] = useState("Select Timings");
  const [datatime, setdatatime] = useState([]);
  const options = [
    { value: "12:00 PM - 01:00 PM" },
    { value: "01:00 PM - 02:00 PM" },
    { value: "02:00 PM - 03:00 PM" },
    { value: "03:00 PM - 04:00 PM" },
    { value: "04:00 PM - 05:00 PM" },
    { value: "05:00 PM - 06:00 PM" },
    { value: "06:00 PM - 07:00 PM" },
    { value: "07:00 PM - 08:00 PM" },
    { value: "08:00 PM - 09:00 PM" },
    { value: "09:00 PM - 10:00 PM" },
    { value: "10:00 PM - 11:00 PM" },
    { value: "11:00 PM - 12:00 AM" },

    { value: "12:00 AM - 01:00 AM" },
    { value: "01:00 AM - 02:00 AM" },
    { value: "02:00 AM - 03:00 AM" },
    { value: "03:00 AM - 04:00 AM" },
    { value: "04:00 AM - 05:00 AM" },
    { value: "05:00 AM - 06:00 AM" },
    { value: "06:00 AM - 07:00 AM" },
    { value: "07:00 AM - 08:00 AM" },
    { value: "08:00 AM - 09:00 AM" },
    { value: "09:00 AM - 10:00 AM" },
    { value: "10:00 AM - 11:00 AM" },
    { value: "11:00 AM - 12:00 PM" },

  ];

  const timing = async () => {
    setIsLoading(true);
    const q = query(collection(db, "stylist"), where("time", "!=", []));
    const querySnapshot = await getDocs(q);
    const datas = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setdatatime(datas);
    setIsLoading(false);
  };
  console.log(datatime);

  const Addaslot = async () => {
    setIsLoading(true);
    console.log(selected[1]);
    let dataArray = {};
    if (selected1 !== "Select Timings" && selected !== "Select Stylist") {
      dataArray = {
        time: arrayUnion(selected1) ,
      };
      const ref = doc(db, "stylist", selected[1]);
      await updateDoc(ref, dataArray);
    } else {
      alert("Please Select A Time Slot ");
    }
    timing();
    setIsLoading(false);
  };


  let timefound;
  if (selected1 !== "Select Timings") {
    const found = stylists.find((element) =>(element.data.time||[]).find((doc) => doc === selected1));
    console.log(found)
    if (found !== undefined) {
      timefound = found.data.time.indexOf(selected1);
    }
  }

  useEffect(() => {
    timing();
  }, []);

  return (
    <div className="slots">
      {/* <TableHeader
        title="Slots Allocation"
        default={true}
        style={{ marginBottom: "15px" }}
      /> */}
            <div className="table-header" style={{  marginBottom: "20px"}}>
      <h2>Slots Allocation</h2>

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
              <label>Stylist:</label>
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
                {stylists.map((val, ind) => (
                  <option>{val.data.name}</option>
                ))}
              </select>
            </div>
            <img src={filterImage} alt=""></img>
          </div>
        </div>
      </div>
    </div>
      <div className="menus-container">
        <DropdownMenu title={selected1}>
          {options.map((item, ind) => {
            return (
              <div onClick={() => setselected1(item.value)} key={ind}>
                {item.value}
              </div>
            );
          })}
        </DropdownMenu>
        <DropdownMenu title={selected[0]}>
          {stylists.map((item, ind) => {

            if (timefound !== undefined && item.data.time!=undefined) {
              console.log('moiz')
              if (
                item.data.time[timefound] != selected1 ||
                selected1 == "Select Timings"
              ) {
                return (
                  <div
                    onClick={() => setselected([item.data.name, item.id])}
                    key={ind}
                  >
                    {item.data.name}
                  </div>
                );
              }
            } else {
              return (
                <div
                  onClick={() => setselected([item.data.name, item.id])}
                  key={ind}
                >
                  {item.data.name}
                </div>
              );
            }
          })}
        </DropdownMenu>
        <button
          onClick={Addaslot}
          type="button"
          className="add-slots-btn"
          style={{cursor:'pointer',marginLeft:40}}
        >
          Add
        </button>
       
      </div>
      {isLoading ? <LoadingSpinner /> : Slots}
      {datatime.map((val, ind) => {
        if (val.name == location || location == "") {
      let arraytime=val.time
        return (
          <div key={ind} className="center-container">
           { arraytime.map((value,index)=><div key={index}className="thing">
              <span>{value}</span>
            </div>)}
            <div className="thing">
              <span>{val.name}</span>
            </div>

          </div>
        );
      }})}
     
    </div>
  );
};

export default Slots;
