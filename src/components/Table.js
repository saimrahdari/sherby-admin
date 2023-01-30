import React, {  useEffect,useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useContext } from "react";
import { IoPencil } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import Modal1 from "./Modal1";
import "../styles/table.css";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillCaretDown } from "react-icons/ai";
import filterImage from "../assets/filterImage.png";
import "../styles/bookingDetails.css";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  getFirestore,  query, addDoc  
} from "firebase/firestore";
import { db } from "../firebase";
import { GlobalContext } from "../contexts/globalState";
import axios from 'axios';
import BookingDetails from "../pages/BookingDetails";
import DetailTbody from "./DetailTbody";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";


const Table = (props) => {

 
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState([])

  
  const { locations } = useContext(GlobalContext);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showData, setShowData] = useState([]);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hideCatModal = () => setShowDetailModal(false);
  console.log(locations)
  const [show, setShow] = useState(false);
  const hideModal = () => setShow(false);
  const acceptordecline = async (uid) => {
    console.log(uid);
    // var axios = require('axios');

    const ref = doc(db, "upcoming_bookings", uid[0]);
    console.log("i am tttttttthereeee")
    // const notificationRef = doc(db, "notifications");
    
    let date = new Date();
    var ampm = date.getHours >= 12 ? 'PM' : 'AM';
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const userref = doc(db, "users", uid[2])
    const userdata = await getDoc(userref);
    const dataa = userdata.exists() ? userdata.data() : null
   if (!dataa){ 
    <Modal contentStyle={{ height: "200px",width:"200px", marginTop:"-250px"}}  hideModal={hideCatModal} show={showDetailModal} >
      <div>User not found</div>
    </Modal>
    alert("user not found")
    return
   }
   
    const fcmToken = dataa.token;

    let dataArray = {};
    if (uid[1] === 1) {
      console.log("i am hereeee")

      // var notificationData = 

      try {
        addDoc(collection(db, "notifications"), {
          bookingId : uid[0],
          dateTime : Date(),
          time: date.getHours() + ":" + date.getMinutes() + " " + ampm,
          date: date.getDay() + " " + monthNames[date.getMonth()],
          message :  `Your booking for ${uid[3].stylist} has been accepted at ${uid[3].date} ${uid[3].time} in our ${uid[3].City} Branch`,
          read : false,
          serviceImg: uid[3].stylistProfile,
          title: "Booking Accepted",
          uid : uid[2],
          username : uid[3].name
        })
      } catch(e){
        console.log(e)
      }
     

      setIsLoading(true);
      var data = JSON.stringify({
        "to": fcmToken,
        "notification": {
          "body": "Booking Accepted",
          "title": `Your booking ${uid[3].name} has been accepted`
        }
      });
      
      await axios.post('https://fcm.googleapis.com/fcm/send', data, {
        headers: {
          'Authorization': 'Bearer AAAA8sCkv1U:APA91bEAxbnwAtCYNSldYKJpp3WFVok4g2HYl4Hcs7OgtVBqqCUiIB0-pTPmbsr9a6gko1hUdechpzcwiAzSEfSfjxv7CMeZ1iV4laRLywizbsOGuHxl_jyXKwaDUVQqq-h7iassCbBL', 
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log("Notification Senttt");
        console.log(fcmToken) 
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

      dataArray = {
        isApprroved: 1,
      };
      setIsLoading(false);
     
    } else if (uid[1] === 0) {
      
      setIsLoading(true);

      try {
        addDoc(collection(db, "notifications"), {
          bookingId : uid[0],
          dateTime : Date(),
          time: date.getHours() + ":" + date.getMinutes() + " " + ampm,
          date: date.getDay() + " " + monthNames[date.getMonth()],
          message :  `Your booking for ${uid[3].stylist} has been declined at ${uid[3].date} ${uid[3].time} in our ${uid[3].City} Branch`,
          read : false,
          serviceImg: uid[3].stylistProfile,
          title: "Booking Declined",
          uid : uid[2],
          username : uid[3].name
        })
      } catch(e){
        console.log(e)
      }


      var data = JSON.stringify({
        "to": fcmToken,
        "notification": {
          "body": "Booking Declined",
          "title": `Your booking ${uid[3].name} has been declined`
        }
      });
      
      // var config = {
      //   method: 'post',
      //   url: 'https://fcm.googleapis.com/fcm/send',
      //   headers: { 
      //     'Authorization': 'Bearer AAAA8sCkv1U:APA91bEAxbnwAtCYNSldYKJpp3WFVok4g2HYl4Hcs7OgtVBqqCUiIB0-pTPmbsr9a6gko1hUdechpzcwiAzSEfSfjxv7CMeZ1iV4laRLywizbsOGuHxl_jyXKwaDUVQqq-h7iassCbBL', 
      //     'Content-Type': 'application/json'
      //   },
      //   data : data
      // };

      await axios.post('https://fcm.googleapis.com/fcm/send', data, {
        headers: {
          'Authorization': 'Bearer AAAA8sCkv1U:APA91bEAxbnwAtCYNSldYKJpp3WFVok4g2HYl4Hcs7OgtVBqqCUiIB0-pTPmbsr9a6gko1hUdechpzcwiAzSEfSfjxv7CMeZ1iV4laRLywizbsOGuHxl_jyXKwaDUVQqq-h7iassCbBL', 
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      
      
      dataArray = {
        isApprroved: 0,
      };
      alert("delete")
      setIsLoading(false);
      
    } else  {
      setIsLoading(true);

      try {
        addDoc(collection(db, "notifications"), {
          bookingId : uid[0],
          dateTime : Date(),
          time: date.getHours() + ":" + date.getMinutes() + " " + ampm,
          date: date.getDay() + " " + monthNames[date.getMonth()],
          message :  `Your booking for ${uid[3].stylist} has been completed at ${uid[3].date} ${uid[3].time} in our ${uid[3].City} Branch`,
          read : false,
          serviceImg: uid[3].stylistProfile,
          title: "Booking Completed",
          uid : uid[2],
          username : uid[3].name
        })
      } catch(e){
        console.log(e)
      }

      var data = JSON.stringify({
        "to": fcmToken,
        "notification": {
          "body": "Booking Completed",
          "title": `Your booking ${uid[3].name} has been completed`
        }
      });

      await axios.post('https://fcm.googleapis.com/fcm/send', data, {
        headers: {
          'Authorization': 'Bearer AAAA8sCkv1U:APA91bEAxbnwAtCYNSldYKJpp3WFVok4g2HYl4Hcs7OgtVBqqCUiIB0-pTPmbsr9a6gko1hUdechpzcwiAzSEfSfjxv7CMeZ1iV4laRLywizbsOGuHxl_jyXKwaDUVQqq-h7iassCbBL', 
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      
      dataArray = {
        isApprroved: 2,
      };
      setIsLoading(false);

    }

  

    try {
      await updateDoc(ref, dataArray);
    } catch (err) {
      console.log(err);
    }
    window.location.reload(true);
  };
  const deletevideos = async (uid) => {
    setIsLoading(true);
    const deletedocument =doc(db, "upcoming_bookings", uid);
    console.log(deletedocument.path);
    await deleteDoc(deletedocument);
    window.location.reload(true)
    setIsLoading(false);
  }
  return (
    
    <div>
      <div className="table-header" style={props.style}>
        <h2>{props.title}</h2>

        <div className="container">
          <div
            className="center-container"
            style={{ width: "100%", justifyContent: "right" }}
          >
            {props.default ? (  
              <div className="location">
                Default <AiFillCaretDown className="icon small" />
              </div>
            ) : (
              ""
            )}
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
                <label className="block mx-2 text-sm font-medium">
                  {" "}
                  Category:{" "}
                </label>
                <select
                  className="block p-2 m-1 max-w-sm text-sm outline-none"
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0)",
                    border: "0 !important",
                    boxShadow: "0 !important",
                    border: "0 !important",
                   cursor:'pointer',
                  }}
                  onChange={(e) => {
                    if (e.target.value == "All") {
                      setLocation("");
                    } else {
                      setLocation(e.target.value);
                    }
                  }}
                >
                  <option >All</option>
                  {locations.map((val,ind)=><option>{val.data.branch}</option>)}
                </select>
              </div>
              <img src={filterImage} alt=""></img>
            </div>
          </div>
        </div>
      </div>
      
      <div className="table w-full">
        <table>
          <tr style={{ backgroundColor: "transparent" }}>
            <th>Name</th>
            <th>City</th>
            <th>Upload Date</th>
            <th>Seller Name</th>
            <th>Seller Contact</th>
            <th>Rating</th>
          </tr>

          {props.data.map((item) => {
            if (item.data.City == location || location == "") {
              return (
                <>
               
                <tr>
                  <td>
                    <div className="name">
                      {/* <img src={item.data.stylistProfile}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "15px",
                        }}
                      /> */}
                      {item.data.name}
                    </div>
                  </td>
                 <td> 
                  {item.data.service[0].name}
                  </td>
                  <td>{item.data.time}</td>
                  <td>{item.data.stylist}</td>
                  <td>{item.data.City}</td>
                  <td>
                    {props.title === "Pending Approvals" ||  props.title === "Pending Bookings"? (
                      <button
                        className="accept"
                        onClick={() => acceptordecline([item.id, 1, item.data.uid, item.data])}
                        style={{cursor:'pointer'}}
                      >
                        Approve
                      </button>
                    ) : (
                      <div></div>
                    )}
                    {props.title === "Pending Approvals" ||  props.title === "Pending Bookings" ? (
                      <button
                        className="decline"
                        onClick={() => acceptordecline([item.id, 0, item.data.uid, item.data])}
                        style={{cursor:'pointer'}}
                      >
                        Decline
                      </button>
                    ) : (
                      <div> 
                      {props.title === "Completed Approvals" ||  props.title === "Completed Bookings" ? (
                        <button
                        className="complete"
                        style={{cursor:'pointer',}}
                      >Completed</button>):( <button
                        className="complete"
                        onClick={() => acceptordecline([item.id, 2, item.data.uid, item.data])}
                        style={{cursor:'pointer'}}
                      >
                        Complete Booking
                      </button>)}
                      </div>
                    )}
                    {/* {props.title === "Completed Approvals" ||  props.title === "Completed Bookings" ? (
                      <button
                        className="complete"
                        onClick={() => acceptordecline([item.id, 3, item.data.uid, item.data.name])}
                        style={{cursor:'pointer'}}
                      >
                        completed
                      </button>
                    ):( <div></div>)} */}
                    <div className="dropdown details">
                      <HiDotsHorizontal style={{cursor:'pointer',}}/>
                      <div className="dropdown-content">
                        <div  key = {item.id}
                      onClick={(e) => {
                        console.log(`kutaaa ${item.id}`);
                        console.log(`blahhhhh ${props.data[1].id}`);
                        let a = props.data.filter( i => i.id === item.id);
                        setShowData(a[0].data)
                        //  props.data.filter(i => {
                        //   return i.id === key
                        // }) 
                        setShowDetailModal(true)
                      }}
                    //       onClick={() => {

                    //         // console.log("going");
                    //      navigate("/booking-details")
                    // }}
                          
                          
                        >
                        
                          <IoPencil className="icon" />
                          Details
                        </div>
                        
                         
                          <button value={item.id} style={{cursor:'pointer',}}
                          onClick={(e) => deletevideos(e.target.value)}>
                          <FaTrash className="icon" /> Delete </button>
                         
                        
                      </div>
                    </div>
                  </td>
                
                </tr>
               
                <Modal1  contentStyle={{ height: "630px",width:"600px", marginTop:"-250px"}}  hideModal={hideCatModal} show={showDetailModal}>
                <BookingDetails
              item = {props.data}
              name={item.data.name}
              phone={item.data.phone}
              date={item.data.date}
              email={item.data.email}
              city={item.data.City}
              time={item.data.time}
              price={item.data.totalPrice}
              stylist={item.data.stylist}
              stylistimg={item.data.stylistProfile}
              service = {item.data.service}
              data={showData}
            />
            </Modal1>
                </>
              );
            }
          })}
          {/* {isLoading ? <LoadingSpinner style={{justifyContent:"center"}} /> : Table} */}
        </table>
      </div>
      
    </div>
  );
};

export default Table;
