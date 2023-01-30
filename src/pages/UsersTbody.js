import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import InputField from "../components/InputField";
import Modal from "../components/Modal";
import "../styles/categories.css";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ActivityKeysTbody(props) {
  const [modal, setmodal] = useState(false);
  const [nameupdate, setnameupdate] = useState("");
  const [emailupdate, setemailupdate] = useState("");
  const [phoneupdate, setphoneupdate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const updateName = (e) => setnameupdate(e.target.value);
  const updateEmail = (e) => setemailupdate(e.target.value);
  const updatePhone = (e) => setphoneupdate(e.target.value);

  const showModal = () => {
    setmodal(true);
  };
  const hideModal = () => setmodal(false);

  const updateuser = async (uid) => {
    setIsLoading(true);
    let userArray = {};
    if (nameupdate !== "" && emailupdate !== "" && phoneupdate !== "") {
      userArray = {
        name: nameupdate,
        email: emailupdate,
        phone: phoneupdate,
      };
    }
    if (nameupdate !== "" && emailupdate === "" && phoneupdate === "") {
      userArray = {
        name: nameupdate,
      };
    }
    if (nameupdate === "" && emailupdate !== "" && phoneupdate === "") {
      userArray = {
        email: emailupdate,
      };
    }
    if (nameupdate === "" && emailupdate === "" && phoneupdate !== "") {
      userArray = {
        phone: phoneupdate,
      };
    }
    if (nameupdate !== "" && emailupdate === "" && phoneupdate !== "") {
      userArray = {
        name: nameupdate,
        phone: phoneupdate,
      };
    }
    if (nameupdate !== "" && emailupdate !== "" && phoneupdate === "") {
      userArray = {
        name: nameupdate,
        email: emailupdate,
      };
    }
    if (nameupdate === "" && emailupdate !== "" && phoneupdate !== "") {
      userArray = {
        email: emailupdate,
        phone: phoneupdate,
      };
    }
    const updatedocument = doc(db, "users", uid);
    await updateDoc(updatedocument, userArray);
    hideModal();
    window.location.reload(true);
    setIsLoading(false);
  };

  const deleteuser = async (uid) => {
    setIsLoading(true);
    console.log(uid);
    const deletedocument = doc(db, "users", uid);
    await deleteDoc(deletedocument);
    window.location.reload(true);
    setIsLoading(false);
  };

  return (
    <>
      <tr>
        <td>
          <div className="name">{props.name}</div>
        </td>
        <td>{props.email}</td>
        <td>{props.phone}</td>
        <td>
            <button onClick={showModal} style={{cursor:'pointer'}} className="accept">
              Edit
            </button>
            <button
              value={props.id}
              onClick={(e) => deleteuser(e.target.value)}
              className="decline"
              style={{cursor:'pointer'}}
            >
              Delete
            </button>
        </td>
       
      </tr>

      <Modal
        title="Adding New Category"
        show={modal}
        hideModal={hideModal}
        contentStyle={{ height: "350px" }}
      >
        <div className="input-fields-container" style={{marginBottom:50}}>
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Enter Name"
            value={nameupdate}
            changeHandler={updateName}
          />
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Enter Email"
            value={emailupdate}
            changeHandler={updateEmail}
          />
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Enter Phone no"
            value={phoneupdate}
            changeHandler={updatePhone}
          />
        </div>
        <button
          className="update-stylist-detail"
          style={{ margin: "10px 20px" }}
          value={props.id}
          onClick={(e) => updateuser(e.target.value)}
        >
          Update
        </button>
      </Modal>
    </>
  );
}
