import React, { useState, useEffect } from "react";
import { IoLockClosedOutline, IoPencil } from "react-icons/io5";
import profileIcon from "../assets/profilePictureIcon.png";
import "../styles/settings.css";
import switchImage from "../assets/switchImage.png";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const Settings = (props) => {
  const [emailupdate, setemailupdate] = useState("");
  const [image, setimage] = useState("");
  const [passwordupdate, setpasswordupdate] = useState("");
  const [userData, setuserData] = useState([]);
  const changeimage = (e) => setimage(e.target.files[0]);

  console.log(image.name);
  const addrefUser = collection(db, "admin");

  const updateuser = async (uid) => {
    let userArray = {};
    if (emailupdate !== "" && passwordupdate !== "") {
      userArray = {
        email: emailupdate,
        password: passwordupdate,
      };
    }
    if (emailupdate !== "" && passwordupdate === "") {
      userArray = {
        email: emailupdate,
      };
    }
    if (emailupdate === "" && passwordupdate !== "") {
      userArray = {
        password: passwordupdate,
      };
    }
    const updatedocument = doc(db, "admin", uid);
    await updateDoc(updatedocument, userArray);
    window.location.reload(true);
  };
  const updateAdmin = async (uid) => {
    const imageRef = ref(storage, `${image.name}`);
    await uploadBytes(imageRef, image);
    const downloadimg = await getDownloadURL(imageRef);
    console.log(downloadimg);
    const updatedocument = doc(db, "admin", uid);
    await updateDoc(updatedocument, {
      picture: downloadimg,
    });
    alert('Image Uploaded')
    window.location.reload(true);
  };

  const getUser = async () => {
    const getData = await getDocs(addrefUser);
    console.log(getData);
    setuserData(getData.docs.map((doc) => ({ id: doc.id })));
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="settings">
      <h2 className="settings-title">Settings</h2>
      <div>
        <h3>Security</h3>
        <div className="settings-fields-container">
          <div className="field">
            <input
              value={passwordupdate}
              onChange={(e) => setpasswordupdate(e.target.value)}
              placeholder="Change Password"
            />
            <IoLockClosedOutline className="icon" />
          </div>
          <div className="field" style={{ borderBottom: "none" }}>
            <input
              value={emailupdate}
              onChange={(e) => setemailupdate(e.target.value)}
              placeholder="Change Email"
            />
            <img
              src={profileIcon}
              alt=""
              style={{ width: "18px", height: "20px" }}
            ></img>
          </div>
          {userData.map((val, ind) => (
            <button   style={{cursor:'pointer'}} className="accept" onClick={() => updateuser(val.id)}>
              Approve
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3>General</h3>
        <div className="settings-fields-container">
          <div className="field">
            <p>Notifications</p>
            <label class="switch">
              <input type="checkbox"  />
              <span class="slider round"></span>
            </label>
          </div>
          <div className="field">
            {image != "" ? <p>{image.name}</p> : <p>Change Profile picture</p>}

            <label for="file">
              <IoPencil className="icon" />

              <input
                type="file"
                onChange={changeimage}
                id="file"
                style={{ display: "none" }}
              />
            </label>
          </div>
          {userData.map((val, ind) => (
            <button
              className="accept"
              style={{ marginTop: 21, marginBottom: 21,cursor:'pointer' }}
              onClick={() => updateAdmin(val.id)}
            
            >
              upload
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
