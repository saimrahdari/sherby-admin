import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import "../styles/subcategoryItem.css";
import ProfilePicture from "./ProfilePicture";
import { db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { GlobalContext, useGlobalState } from "../contexts/globalState";
import Modal from "../components/Modal";
import InputField from "../components/InputField";

const SubCategoryItem = ({ item, uid, style }) => {
  const [showSubModal, setShowSubModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const updateName = (e) => setName(e.target.value);
  const updateprice = (e) => setprice(e.target.value);
  const hideSubModal = () => setShowSubModal(false);
  const { deletesubcategory,updatesubcategory } = useGlobalState();
  const deletesubcat = async (uid) => {
    const ref = doc(db, "category", uid);
    let index = {
      name: name,
      price: price,
    };
  //   try {
  //     const subcategory = await updateDoc(ref, {
  //       subcategories: arrayRemove(index),
  //     });
  //     window.location.reload(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  
  try {
    const del = await deleteDoc(ref, {
      subcategories: arrayUnion(index),
    });
    console.log(del);
    deletesubcategory(uid);
  } catch (err) {
    console.log(err);
  }
};


  const eidt = async (uid) => {
    console.log(uid);
    const ref = doc(db, "category", uid);
 
    
    try {
      let index = {
        name: name.trim(),
        price: price.trim(),
      };
      console.log(index);
      updatesubcategory(uid, name, price);
      const subcategory = await updateDoc(ref, {
        subcategories: arrayUnion(index),
      });
      console.log(subcategory);
    } catch (err) {
      console.log(err);
    }
    hideSubModal();
  };

 
  return (
    <>
      <div className="subcategory-item" style={style}>
        <div className="subdescription-container">
          {/* <div className="subcategory-picture"></div> */}
          {/* <ProfilePicture
          imgStyle={{
            width: "29px",
            height: "29px",
            marginRight: "15px",
            borderRadius: "6px",
          }}
        /> */}
          <div className="subcategory-description">
            <span>{item.name}</span>
            <div>
              ${item.price}
              {/* <div className="circle"></div> <div style={{fontSize: '10px', fontWeight: '400'}} >Hair Serivce</div> */}
            </div>
          </div>
        </div>
        <div className="subcategory-buttons-container">
          <FaTrash
            className="icon"
            style={{ cursor: "pointer" }}
            onClick={() => deletesubcat([item.name, item.price, uid])}
          />
          <IoPencil
            className="icon"
            style={{ cursor: "pointer" }}
            onClick={() => setShowSubModal(true)}
          />
        </div>
      </div>

      <Modal
        title="Edit A Category"
        show={showSubModal}
        hideModal={hideSubModal}
        contentStyle={{ height: "350px" }}
      >
        {/* <div className="picture-container">
          <ProfilePicture imgStyle={{ width: "45px", height: "45px" }} />
          <span>Update picture</span>
        </div> */}
        <div className="input-container" style={{ marginTop: 90 }}>
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder={item.name}
            value={name}
            changeHandler={updateName}
          />
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder={item.price}
            value={price}
            changeHandler={updateprice}
          />
        </div>
        <button
          className="update-stylist-detail"
          style={{ margin: "10px 20px" ,cursor:'pointer'}}
          onClick={() => eidt(item.id)}
        >
          Update
        </button>
      </Modal>
    </>
  );
};

export default SubCategoryItem;
