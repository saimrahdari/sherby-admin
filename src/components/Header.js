import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import {GoPrimitiveDot} from "react-icons/go"
import ProfilePicture from "./ProfilePicture";
import Headline from "./Headline";
import "../styles/header.css";
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
import { db, auth, messaging } from "../firebase";
import { useGlobalState } from "../contexts/globalState";
import { useEffect } from "react";
const Header = (props) => {
  const navigate = useNavigate();
  const [color, setColor] = useState(false);
  const [Data, setData] = useState([]);
  const { adminCredentials } = useGlobalState();
  const toggleColor = () => setColor(color ? false : true);
  const reff=query(collection(db, "webnotifications"), where("read", "==", false));
  const getNotification = async () => {
    
    const getData = await getDocs(reff);
    console.log(getData);
    setData(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   
   
   
  };
  const totalPosts=Data.length
  console.log("totl",totalPosts)
  useEffect(() => {
    getNotification();
   
  }, []);
  return (
    <div className="header">
      <Headline
        text="Admin!"
        line={new Date().toDateString().slice(4)}
        style={{ marginTop: "20px" }}
        lineStyle={{ color: "white", textAlign: "left" }}
      />
      <div className="header-options" >
     
      <div className="flex flex-col not">
      {totalPosts===0 ? " ":
      <p className="dot">{totalPosts}</p>}
      {/* {Data.map((val,ind) => {
       
          return(
      <GoPrimitiveDot className="dot"/>)
      })} */}
        <IoIosNotifications
          style={{cursor:'pointer'}}
          className='icon'
          onClick={() => {
            // toggleColor();
            navigate("/notifications", { replace: true });
          }}
        />
        </div>
        <ProfilePicture picture={adminCredentials.picture}/>
      </div>
    </div>
  );
};

export default Header;
