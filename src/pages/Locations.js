import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useContext } from "react";
import { GlobalContext } from "../contexts/globalState";
import "../styles/locations.css";
import Modal from "../components/Modal";
import Modal1 from "../components/Modal1";
import "../styles/table.css";
import InputField from "../components/InputField";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
  arrayUnion,
} from "firebase/firestore";
import DropdownMenu from "../components/DropdownMenu";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Locations(props) {
  const { locations } = useContext(GlobalContext);
  const addreflocation = collection(db, "location");

  const [show, setShow] = useState(false);
  const hideModal = () => setShow(false);

  const [show1, setShow1] = useState(false);
  const hideModal1 = () => setShow1(false);

  const [show2, setShow2] = useState(false);
  const hideModal2 = () => setShow2(false);

  const [locationshow, setlocationshow] = useState(false);
  const locationshowset = () => setlocationshow(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [selected, setselected] = useState(["Select Location"]);
  const [City, setCity] = useState("");
  const [Street, setStreet] = useState("");
  const [LocationData, setlocationData] = useState([]);
  const [loc, setloc] = useState([]);
  const [book, setbook] = useState([]);
  const addcity = (e) => setCity(e.target.value);
  const addstreet = (e) => setStreet(e.target.value);
  const getlocation = async () => {
    setIsLoading(true);
    const getData = await getDocs(addreflocation);
    console.log(getData);
    setlocationData(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
  };

  const addlocation = async () => {
    setIsLoading(true);
    const addData = await addDoc(addreflocation, {
      branch: City,
    }).catch((err) => {
      console.log(err);
    });
    hideModal();
    getlocation();
    window.location.reload(true);
    setIsLoading(false);
  };
  const updatelocation = async () => {
    setIsLoading(true);
    const ref=doc(db,"location",selected[1])
    const addData = await updateDoc(ref, {
      street: arrayUnion(Street),
    }).catch((err) => {
      console.log(err);
    });
    locationshowset();
    window.location.reload(true);
    setIsLoading(false);
  };

  const filterBooking = async (location) => {
    setIsLoading1(true);
    console.log(location);
    const ref = collection(db, "upcoming_bookings");
    const q = query(ref, where("City", "==", location));
    const querySnapshot = await getDocs(q);
    setbook(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(loc);
    setIsLoading1(false);
  };

  const filterStylistLocation = async (location) => {
    setIsLoading2(true);
    console.log(location);
    const ref = collection(db, "stylist");
    const q = query(ref, where("City", "==", location));
    const querySnapshot = await getDocs(q);
    setloc(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(loc);
    setIsLoading2(false);
  };

console.log(selected)
useEffect(() => {
  getlocation();
}, []);
  return (
    <>

    <div className="locations">
      <div className="location-header">
        <h2 >Branch</h2>
        {/* <button
          style={{ marginLeft: 900 }}
          onClick={() => setlocationshow(true)}
        >
          Add Branch Location
        </button> */}
        <button style={{cursor:'pointer'}} onClick={() => setShow(true)}>Add Branch </button>
        </div>
        <Modal
          title="Branch"
          show={show}
          hideModal={hideModal}
          contentStyle={{ height: "350px" }}
        >
          <div className="picture-container">
            {/* <div className="add-picture"></div> */}

            <span>Enter Details</span>
          </div>
          <div className="input-fields-container" style={{ marginTop: "40px" }}>
            <InputField
              icon={HiLocationMarker}
              fieldStyle={{ height: "50px", width: "180px" }}
              placeholder="Enter Branch Name"
              value={City}
              changeHandler={addcity}
            />
          </div>
          <button style={{cursor:'pointer'}} className="update-stylist-detail" onClick={addlocation}>
            Add Branch
          </button>
          {isLoading ? <LoadingSpinner /> : Locations}
        </Modal>


          {/* <div className="input-fields-container" style={{ marginTop: "40px" }}>
          <DropdownMenu title={selected[0]}>
              {locations.map((item, ind) => {
                return (
                  <div key={ind} onClick={() => setselected([item.data.city,item.id])}>
                    {item.data.city}
                  </div>
                );
              })}
            </DropdownMenu>
            <InputField
              icon={HiLocationMarker}
              fieldStyle={{ height: "50px", width: "180px" }}
              placeholder="Enter Street Name"
              value={Street}
              changeHandler={addstreet}
            />
          </div> */}
          {/* <button className="update-stylist-detail" onClick={updatelocation}>
            Add Branch
          </button> */}


          {isLoading2 ? <LoadingSpinner className="loader" /> : 
        <Modal1
          title="Branch"
          show={show1}
          hideModal={hideModal1}
          contentStyle={{ height: "350px",width: "650px" }}
        >
         
            <span style={{color:'white',fontSize:'20px'}}>Stylists Present Here {loc.length}</span>
          <div className="">
          <table className="table  w-[600px] justify-between " >
          <tr className="justify-between " style={{ backgroundColor: "transparent", fontSize:"16px", justifyContent:"center"}}>
                  <th style={{fontSize:"16px", paddingRight:"190px"}} >Stylist Name: </th>
                  <th style={{fontSize:"16px"}} >Branch: </th>
                </tr>
            {loc.map((val, ind) => {
              console.log(val);
              return (
                <tr className="justify-between text-white p-5" >
                  <td style={{fontSize:"20px",color:"white", paddingLeft:"10px"}} > {val.name}</td>
                  <td style={{fontSize:"20px",color:"white",paddingRight:"10px"}}> {val.City}</td>
                </tr>
              );
            })}
          </table></div>
        </Modal1>}
        {isLoading1 ? <LoadingSpinner style={{alignItems:"center"}} /> : 
        <Modal1
          title="Branch"
          show={show2}
          hideModal={hideModal2}
          contentStyle={{ height: "350px", width: "650px" }}
        >
          <div className="picture-container">
            {/* <div className="add-picture"></div> */}
            <span style={{color:'white',fontSize:'20px'}}>Bookings {book.length}</span>
          </div>
          <table className="table  w-[600px] justify-between " >
          <tr className="justify-between " style={{ backgroundColor: "transparent", fontSize:"16px", justifyContent:"center"}} >
                  <th style={{fontSize:"16px", paddingRight:"150px"}} >Name: </th>
                  <th style={{fontSize:"16px", paddingRight:"150px"}}>City:</th>
                  <th style={{fontSize:"16px"}} >Stylist Booked:</th>
                </tr>
            {book.map((val, ind) => {
              console.log(val);
              return (
                <tr className="p-5"

                >
                  <td style={{fontSize:"20px",color:"white",paddingLeft:"10px"}}>  {val.name}</td>
                  <td style={{fontSize:"20px",color:"white"}} > {val.City}</td>
                  <td style={{fontSize:"20px",color:"white", paddingRight:"10px"}}> {val.stylist}</td>
                </tr>
              );
            })}
          </table>
        </Modal1>}
        {props.isLoading ? <LoadingSpinner /> : Locations}
      {locations.map((item) => {
        // let st=item.data.street;
        return (
          <div className="location-item" key={item.id}>
            <div className="address">
              <HiLocationMarker className="icon" />
              <p>
              Branch {item.data.branch}
              </p>
              {/* { st.map((val,ind) =><p key={ind}>, Branch {val}</p>)} */}
            </div>
            <div className="actions">
              <button
              style={{cursor:'pointer'}}
                onClick={() => {
                  filterBooking(item.data.branch);
                  setShow2(true);
                }}
              >
                View Bookings
              </button>
              <button
              style={{cursor:'pointer'}}
                onClick={() => {
                  filterStylistLocation(item.data.branch);
                  setShow1(true);
                  
                }}
              >
                View Stylists
              </button>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}
