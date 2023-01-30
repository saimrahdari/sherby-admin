import React, {  useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useContext } from "react";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { useState } from "react";
import "../styles/table.css";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillCaretDown } from "react-icons/ai";
import { IoStarSharp } from "react-icons/io5";

import "../styles/bookingDetails.css";
import filterImage from "../assets/filterImage.png";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  getFirestore,  query  
} from "firebase/firestore";
import { db } from "../firebase";
import { GlobalContext } from "../contexts/globalState";
import axios from 'axios';
import BookingDetails from "../pages/BookingDetails";


const DetailTbody = (props) => {
  const navigate = useNavigate();
  const { locations } = useContext(GlobalContext);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(locations)
  const acceptordecline = async (uid) => {
    console.log(uid);
    // var axios = require('axios');

    const ref = doc(db, "upcoming_bookings", uid[0]);
    const userref = doc(db, "users", uid[2])
    const userdata = await getDoc(userref);
    const dataa = userdata.exists() ? userdata.data() : null
    const fcmToken = dataa.token;
   
    let dataArray = {};
    if (uid[1] === 1) {

      var data = JSON.stringify({
        "to": fcmToken,
        "notification": {
          "body": "Booking Accepted",
          "title": `Your booking ${uid[3]} has been accepted`
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
        isApprroved: 1,
      };
      alert("Approved");
     
    } else if (uid[1] === 0) {
      

      var data = JSON.stringify({
        "to": fcmToken,
        "notification": {
          "body": "Booking Declined",
          "title": `Your booking ${uid[3]} has been declined`
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
      alert("Declined");
      
    } else {
      var data = JSON.stringify({
        "to": fcmToken,
        "notification": {
          "body": "Booking Completed",
          "title": `Your booking ${uid[3]} has been completed`
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
      alert("Completed");

    }

    try {
      await updateDoc(ref, dataArray);
    } catch (err) {
      console.log(err);
    }
    window.location.reload(true);
  };
  const deletevideos = async (uid) => {
    const deletedocument =doc(db, "upcoming_bookings", uid);
    console.log(deletedocument.path);
    await deleteDoc(deletedocument);
    window.location.reload(true)
  }
  return (
    <div className="booking-details">
    
      <h2>Booking Details</h2>
      {props.data.map((item) => {
        if (item.data.uid == props.id) {
            return(
      <div className="details">
        <div className="cell">
          Name <span>{props.name}</span>
        </div>
        <div className="cell">
          Phone <span>{props.phone}</span>
        </div>
        <div className="cell">
          Date <span>{props.date}</span>
        </div>
        <div className="cell">
          Start Time <span>{props.time}</span>
        </div>
        <div className="cell">
          Email <span>{props.email}</span>
        </div>
        <div className="cell" id="stylist">
          Stylist
          <div className="card">
            <img src={props.stylistimg}
              style={{ width: "35px", height: "35px", marginRight: "20px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "16px",
              }}
            >
             {props.stylist}
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
        <div className="cell">
          Duration <span>1 hour</span>
        </div>
        <div className="cell">
          Location <span>{props.city}</span>
        </div>
      </div>)
      }  
     })}
      <div className="services">
        Services
        <div>
          <div className="service-item">
            <span>{props.servicename}</span>
            <span style={{ fontWeight: "700" }}>{props.serviceprice}</span>
          </div>
          <div className="service-item">
            <span>Hair cut</span>
            <span style={{ fontWeight: "700" }}>$50</span>
          </div>
        </div>
      </div>
      <div className="total">
        Total Payment
        <div className="item">
          <span>Total</span>
          <span style={{ fontWeight: "700" }}>$100</span>
        </div>
      </div>
      <button>Reject</button>
      <button className="approve">Approve</button>
   
    </div>
    
  );
};

export default DetailTbody;
