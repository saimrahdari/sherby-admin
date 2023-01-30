import { useEffect } from "react";
import { useState } from "react";
import { IoStarSharp } from "react-icons/io5";

import "../styles/bookingDetails.css";

const BookingDetails = (props) => {


  const [showDetailModal, setShowDetailModal] = useState(false);


  return (  
    <div className="booking-details"   show={showDetailModal}>
      <h2>Booking Details</h2>
      <div className="details">
        <div className="cell">
          Name <span>{props.data.name}</span>
        </div>
        <div className="cell">
          Phone <span>{props.data.phone}</span>
        </div>
        <div className="cell">
          Date <span>{props.data.date}</span>
        </div>
        <div className="cell">
          Start Time <span>{props.data.time}</span>
        </div>
        <div className="cell">
          Email <span>{props.data.email}</span>
        </div>
        <div className="cell" id="stylist">
          Stylist
          <div className="card">
            <img src={props.data.stylistProfile}
              style={{ width: "35px", height: "35px", marginRight: "10px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "16px",
              }}
            >
             {props.data.stylist}
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
          Location <span>{props.data.City}</span>
        </div>
      </div>
      <div className="services">
        Services
        <div>
          {

            props.data.service !== undefined ? 
            props.data.service.map((val) => (
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
          <span style={{ fontWeight: "700" }}>$ {props.data.totalPrice}</span>
        </div>
      </div>
      {/* <button onClick={props.decline}>Reject</button>
      <button onClick={props.accept} className="approve">Approve</button> */}
    </div>
  );
};

export default BookingDetails;
