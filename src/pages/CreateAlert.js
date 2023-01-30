import React, { useState, useEffect } from "react";
import { IoIosListBox } from "react-icons/io";
import axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";

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
          <h2>Create Alert</h2>
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
        <div className="search-bar">
          <IoIosListBox className="icon" />
          <input
            value={bodyData}
            onChange={(e) => setBodyData(e.target.value)}
            placeholder="Enter Notification here"
          />
        </div>
        
          
        <button style={{cursor:'pointer'}} className="add-user-btn" onClick={SendNotification}>
            Send Notification
          </button>


      </div>

      {isLoading ? <LoadingSpinner style={{justifyContent:"center"}} /> : null}
    </>
  );
}
