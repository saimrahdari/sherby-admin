import "../styles/notifications.css";
import tick from "../assets/tick.png";
import React, { useState, useEffect } from "react";
import Modal1 from "../components/Modal1";
import { IoStarSharp } from "react-icons/io5";
import {
  
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  equalTo,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";
import BookingDetails from "../pages/BookingDetails";
import { db, auth, messaging } from "../firebase";
import axios from 'axios';
const arr = [
  {
    text: "Booking ahead get ready!",
    time: "12:00 PM",
  },
  {
    text: "Booking ahead get ready!",
    time: "12:00 PM",
  },
  {
    text: "Booking ahead get ready!",
    time: "12:00 PM",
  },
];

const Notifications = (props) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const hideCatModal = () => setShowDetailModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [booking, setBooking] = useState([]);
  const addref = collection(db, "webnotifications");
const bookingid= collection(db, "upcoming_bookings");
const reff=query(collection(db, "webnotifications"), where("read", "==", false));
const bookingidd=query(collection(db, "upcoming_bookings"), where("id", "==", 1));

const idbook= [];
const data = Data;
  data.id = Data.id;
  idbook.push(data);
  
 console.log("idbook",idbook)
 const acceptid = async e =>{
  idbook.map( (val,id)=>{
    console.log(val.id)
//   const ref = doc(db, "webnotifications",val.id);
 
//    await updateDoc(ref,{
//       read: true,
      
//     });
// //  setShowDetailModal(true)
//   window.location.reload(true);
 })}
const acceptordecline = async (id) => {
  // console.log(uid);
  // var axios = require('axios');
  
  const ref = doc(db, "webnotifications",id);

    await updateDoc(ref,{
      read: true,
      
    });
//  setShowDetailModal(true)
  window.location.reload(true);
}
const [idd,setidd]= useState()
const accept = async (uid) => {
  console.log(uid);
  // var axios = require('axios');
  setidd(uid)
 setShowDetailModal(true)
  
}



const getBooking = async () => {
  setIsLoading(true);
  const getData = await getDocs(bookingid);
  console.log("iddata",getData);
  setBooking(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  setIsLoading(false);
  
};
  const getNotification = async () => {
    setIsLoading(true);
    const getData = await getDocs(reff);
    console.log(getData);
    setData(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   
    setIsLoading(false);
   
  };


  useEffect(() => {
    getNotification();
    getBooking();
  }, []);
  
//   Data.map((val)=>{
// setid(val.id)
//   })
  return (
    <>
    <div className="notifications">
      <div id="notifications-header">
        <h2>Notifications</h2>
       
      </div>

      {Data.map((val,ind) => {
        
        return (
          
          <div className="notification" style={{cursor:"pointer"}} >
         
            <div className="circle"></div>
            <button onClick={()=>  accept(val.bookingId)}  style={{background:"transparent", border:"none"}} > <p style={{cursor:"pointer"}}>{val.title}</p></button>
            <div className="time"><span>{val.date}</span>  <span style={{fontSize:"14px"}}>{val.time}</span></div>
            <img
            onClick={()=>  acceptordecline(val.id)}
            src={tick}
            style={{ width: "18px", height: "18px", marginRight: "5px", marginLeft:"10px"}}
            alt=""
          ></img>
          </div>
        );
      })}
      <p className="caption">All Catched Up</p>
    </div>

    <Modal1  contentStyle={{ height: "630px",width:"630px", marginTop:"-250px"}}  hideModal={hideCatModal} show={showDetailModal}>
   
               {booking.map((val,ind) => {
               if(val.id === idd){
          return(
          <> 
         
          <div className="booking-details"   show={showDetailModal}>
      <h2>Booking Details</h2>
      <div className="details">
        <div className="cell">
          Name <span>{val.name}</span>
        </div>
        <div className="cell pr-3">
          Phone <span className="pr-3">{val.phone}</span>
        </div>
        <div className="cell">
           Date <span >{val.date}</span>
        </div>
        <div className="cell">
          Start Time <span>{val.time}</span>
        </div>
        <div className="cell">
          Email <span>{val.email}</span>
        </div>
        <div className="cell" id="stylist">
          Stylist
          <div className="card">
            <img src={val.stylistProfile}
              style={{ width: "35px", height: "35px", marginRight: "10px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "16px",
              }}
            >
             {val.stylist}
              <div>
                <IoStarSharp className="icon" />
                <IoStarSharp className="icon" />
                <IoStarSharp className="icon" />
                <IoStarSharp className="icon" />
                <IoStarSharp className="icon" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="cell">
          Duration <span>1 hour</span>
        </div> */}
        <div className="cell">
          Location <span>{val.City}</span>
        </div>
      </div>
      <div className="services">
        Services
        <div>
          {

            val.service !== undefined ? 
            val.service.map((val) => (
              <div className="service-item">
                <span>{val.name}</span>
                <span style={{ fontWeight: "700" }}>$ {val.price}</span>
              </div>
              ))
            : null 
            // console.log(props.data.service)
            // props.data.service.map((val) => (
            // <div className="service-item">
            //   <span>{val.name}</span>
            //   <span style={{ fontWeight: "700" }}>{val.price}</span>
            // </div>
            // ))
            // props.data.service( val => {
            //    return(
            //     <div>{val.name}</div>
            //   )
            // })
          }
          
        </div>
      </div>
      <div className="total">
        Total Payment
        <div className="item">
          <span>Total</span>
          <span style={{ fontWeight: "700" }}>$ {val.totalPrice}</span>
        </div>
      </div>
      {/* <button onClick={props.decline}>Reject</button>
      <button onClick={props.accept} className="approve">Approve</button> */}
    </div>
           {/* <BookingDetails
             
              name={val.name}
              phone={val.phone}
              date={val.date}
              email={val.email}
              city={val.City}
              time={val.time}
              price={val.totalPrice}
              stylist={val.stylist}
              stylistimg={val.stylistProfile}
              service = {val.service}
              // data={showData}
            /> */}
            </>
           )
         
               }
             })}
            </Modal1>
    </>
  );
};

export default Notifications;
