import React, { useState, useEffect } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoSearchOutline, IoInformationCircleOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import ProfilePicture from "../components/ProfilePicture";
import "../styles/users.css";
import "../styles/table.css";
import InputField from "../components/InputField";
import Modal from "../components/Modal";
import "../styles/categories.css";
import { db, auth, messaging } from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";



import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import UsersTbody from "./UsersTbody";
import LoadingSpinner from "../components/LoadingSpinner";


export default function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [addname, setaddname] = useState("");
  const [addemail, setaddemail] = useState("");
  const [addphone, setaddphone] = useState("");
  const [modal, setmodal] = useState(false);

  const addName = (e) => setaddname(e.target.value);
  const addEmail = (e) => setaddemail(e.target.value);
  const addPhone = (e) => setaddphone(e.target.value);

  const [userData, setuserData] = useState([]);
  const addrefUser = collection(db, "users");

  const getUser = async () => {
    setIsLoading(true);
    const getData = await getDocs(addrefUser);
    console.log(getData);
    setuserData(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
  };

  const keys = ["name", "email", "phone"];
  const [search, setsearch] = useState("");
  const searches = (datas) => {
    return datas.filter((item) =>
      keys.some((key) => item[key]?.toLowerCase().includes(search))
    );
  };

  const AddUser = async () => {
   
    // const fcmToken = await messaging().getToken();
    // const messagin = getMessaging();
    const messaging = getMessaging();
getToken(messaging, { vapidKey: 'BAOfNwM-b6pwwaMeHGbZu7Btmn2h09zuHiFVQtAR36stoYTMqyywgb3iMQAA9NX7Pv1AbtMjnHpAKCw-LP-p5VA' }).then(async (currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log("PASSS");
    console.log(currentToken);
    setIsLoading(true);
    const res = await createUserWithEmailAndPassword(auth, addemail, "abcd1234");
    const user = res.user;
    const addData = await addDoc(addrefUser, {
      uid: user.uid,
      photoUrl : "",
      name: addname,
      email: addemail,
      number: addphone,
      token: currentToken
    })
      .then(() => {
        console.log(addData);
      })
      .catch((err) => {
        console.log(err);
      });
    setaddname("");
    setaddemail("");
    setaddphone("");
    setmodal(false);
    getUser();
    setIsLoading(false);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

    // const fcmToken = await getToken({vapidKey: ""});  
    setIsLoading(false); 
  };

  const showModal = () => {
    setmodal(true);
  };
  const hideModal = () => setmodal(false);

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
     {/* {isLoading ? <LoadingSpinner style={{justifyContent:"center", }} /> :  */}
      <div className="users ">
        <div className="flexing">
          <h2>Users</h2>
          <button style={{cursor:'pointer'}} className="add-user-btn" onClick={showModal}>
            Add
          </button>
        </div>
        <div className="search-bar">
          <IoSearchOutline className="icon" />
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search user by name or email..."
          />
        </div>

        <div className="table w-full">
          <table style={{ height: "auto" }}>
            <tr
              style={{
                backgroundColor: "transparent",
                borderBottom: "0.5px solid rgba(124, 124, 124, 0.27)",
              }}
            >
              <th>Name</th>
              <th>Email </th>
              <th>Phone No</th>
              <th>Registered On</th>
            </tr>
            {searches(userData).map((val, ind) => {
              return (
                <UsersTbody
                  key={ind}
                  id={val.id}
                  name={val.name}
                  email={val.email}
                  phone={val.number}
                />
              );
            })}
          </table>
        </div>
      </div>
      {/* } */}
      <Modal
        title="Adding New Category"
        show={modal}
        hideModal={hideModal}
        contentStyle={{ height: "350px" }}
      >
        <div className="input-fields-container" style={{marginBottom:60}}>
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Enter Name"
            value={addname}
            changeHandler={addName}
          />
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Enter Email"
            value={addemail}
            changeHandler={addEmail}
          />
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Enter Phone no"
            value={addphone}
            changeHandler={addPhone}
          />
        </div>
        <button
          className="update-stylist-detail"
          style={{ margin: "10px 20px" }}
          onClick={AddUser}
        >
          Add
        </button>
        {isLoading ? <LoadingSpinner /> : Users}
      </Modal>
    </>
  );
}
