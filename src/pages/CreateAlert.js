import React, { useState, useEffect } from "react";
import { IoIosListBox } from "react-icons/io";
import axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";
import filterImage from "../assets/filterImage.png";
import "../styles/bookingDetails.css";
import "../styles/table.css";import { HiDotsHorizontal } from "react-icons/hi";
import { useContext } from "react";
import { IoPencil } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/table.css";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillCaretDown } from "react-icons/ai";
import "../styles/bookingDetails.css";
import { GlobalContext } from "../contexts/globalState";
import BookingDetails from "../pages/BookingDetails";


export default function CreateAlert() {

  const [titleData, setTitleData] = useState("");
  const [bodyData, setBodyData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const SendNotification = async () => {
    setIsLoading(true);
    var data = JSON.stringify({
      "to": "/topics/myTopic",
      "notification": {
        "title": titleData,
        "body": bodyData
      }
    });

    await axios.post('https://fcm.googleapis.com/fcm/send', data, {
      headers: {
        'Authorization': 'key=AAAA8sCkv1U:APA91bEAxbnwAtCYNSldYKJpp3WFVok4g2HYl4Hcs7OgtVBqqCUiIB0-pTPmbsr9a6gko1hUdechpzcwiAzSEfSfjxv7CMeZ1iV4laRLywizbsOGuHxl_jyXKwaDUVQqq-h7iassCbBL', 
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log("Senttttttttt")
      console.log(JSON.stringify(response.data));
      setBodyData("")
      setTitleData("")
      alert("Message Sent Successfully")
    })
    .catch(function (error) {
      console.log("erorrrrrrrrr")
      console.log(error);
      setBodyData("")
      setTitleData("")
      alert("Message Not Sent")
    });

    setIsLoading(false);



    // const topic = '/topics/myTopic';

    // const message = {
    //   notification: {
    //     title : titleData,
    //     body : bodyData 
    //   },
    //   topic: topic
    // };

    // // Send a message to devices subscribed to the provided topic.
    // getMessaging().send(message)
    //   .then((response) => {
    //     // Response is a message ID string.
    //     console.log('Successfully sent message:', response);
    //   })
    //   .catch((error) => {
    //     console.log('Error sending message:', error);
    //   });
  };

  return (
    <>
      <div className="users ">
        <div className="flexing">
          <h2>Create Promo</h2>
        </div>
        <div className="search-bar">
          <IoIosListBox className="icon" />
          <input
            value={titleData}
            onChange={(e) => setTitleData(e.target.value)}
            placeholder="Enter Title here"
          />
        </div>
        <br></br>

        <div style={{
          borderColor: "#20D581",
          border: "1px solid #20D581",
          padding: "20px",
          borderRadius: "10px",
          width : "85%",
          display: "flex",
          alignItems: "center"
          
            }}>
          <div
            style={{
              height: "fit-content",
              width: "fit-content",
              borderRadius: 25,
            }}
          >
            
          <IoIosListBox style = {{
          color: "white",
          height : "25",
          width : "25"
          }}/>
            {/* <HiLocationMarker className="icon" /> Location: All
          <AiFillCaretDown className="icon small" /> */}
            {/* <label className="block mx-2 text-sm font-medium" style={{
              color: "white"
            }}>
              {" "}
              Type:{" "}
            </label> */}
            <select
              style={{
                color: "black",
                backgroundColor: ""
              }}
              onChange={(e) => {
                // if (e.target.value == "All") {
                //   setLocation("");
                // } else {
                //   setLocation(e.target.value);
                // }
              }}
            >
              <option>Main Promo</option>
              <option>Small Promo</option>
              <option>Secondary Promo</option>
              
            </select>
          </div>
        </div>


        {/* <div className="search-bar">
          <IoIosListBox className="icon" />
          <input
            value={bodyData}
            onChange={(e) => setBodyData(e.target.value)}
            placeholder="Enter Notification here"
          />
        </div> */}
        
          
        <button style={{cursor:'pointer'}} className="add-user-btn" onClick={SendNotification}>
            Create Promo
          </button>


      </div>

      {isLoading ? <LoadingSpinner style={{justifyContent:"center"}} /> : null}
    </>
  );
}
