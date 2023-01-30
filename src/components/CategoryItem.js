import { IoAddCircleOutline, IoPencil } from "react-icons/io5";
import { AiFillCaretDown } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import SubCategoryItem from "./SubcategoryItem";
import ProfilePicture from "../components/ProfilePicture";
import "../styles/categoryItem.css";
import { useContext, useEffect, useState } from "react";
import { GlobalContext, useGlobalState } from "../contexts/globalState";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import "../styles/categories.css";
import LoadingSpinner from "./LoadingSpinner";

const CategoryItem = ({ item, showModal, deletecarmodel }) => {
  const [showSubModal, setShowSubModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [showsubCat, setShowsubCat] = useState(false);
  const hideSubModal = () => setShowSubModal(false);
  const hideCatModal = () => setShowCatModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    updatecategory, deletecategory,
  } = useGlobalState();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const updateName = (e) => setName(e.target.value);
  const updateType = (e) => setType(e.target.value);

  const deleteCatData = async (id) => {
    setIsLoading(true);
    console.log("moix");
    const ref = doc(db, "category", id);
    try {
      const del = await deleteDoc(ref);

      deletecategory(id);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  

  const EditCat = async (uid) => {
    setIsLoading(true);
    const ref = doc(db, "category", uid);
    try {
      await updateDoc(ref, {
        name: name.trim(),
        type: type.trim(),
      });
      updatecategory(uid, name, type);
    } catch (err) {
      console.log(err);
    }
    hideSubModal();
    setIsLoading(false);
  };
  console.log(item.data.subcategories)
 
  return (
    <>
      <div className="category-item">
        <div className="category">
          <div className="description-container">
            {/* <ProfilePicture
              imgStyle={{
                width: "42px",
                height: "42px",
                borderRadius: "6px",
                marginRight: "20px",
              }}
            /> */}
            <div className="description">
              <span>{item.data.name}</span>
              <div>
                <div className="circle"></div> {item.data.type}
              </div>
            </div>
          </div>
          {isLoading ? <LoadingSpinner /> : CategoryItem}
          <div className="buttons-container">
            <div className="add-btn">
              Add subcategory
              <IoAddCircleOutline
                style={{cursor:'pointer'}}
                className="icon"
                onClick={() => showModal(item.id)}
              />
            </div>
            <FaTrash   style={{cursor:'pointer'}} onClick={() => deleteCatData (item.id)} className="icon" />
            <IoPencil
              style={{cursor:'pointer'}}
              onClick={() => setShowCatModal(true)}
              className="icon"
            />
            {showsubCat===false && <AiFillCaretDown   style={{cursor:'pointer'}} onClick={() => setShowsubCat(true)} className="icon" />}
       {    showsubCat===true && <AiFillCaretDown    style={{cursor:'pointer'}} onClick={() => setShowsubCat(false)} className="icon" />}
          </div>
        </div>

        {showsubCat===true && item.data.subcategories.map((cat, index) => {
          if (index === item.data.subcategories.length - 1) {
            return (
              <SubCategoryItem item={cat} uid={item.id} style={{ borderBottom: "none" }} />
            );
          } else {
            return <SubCategoryItem item={cat} />;
          }
        })}
      </div>

      <Modal
        title="Edit A Category"
        show={showCatModal}
        hideModal={hideCatModal}
        contentStyle={{ height: "350px" }}
      >
        {/* <div className="picture-container">
          <ProfilePicture imgStyle={{ width: "45px", height: "45px" }} />
          <span>Update picture</span>
        </div> */}
        <div className="input-container">
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder={item.data.name}
            value={name}
            changeHandler={updateName}
          />
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder={item.data.type}
            value={type}
            changeHandler={updateType}
          />
        </div>
        <button
          className="update-stylist-detail"
          style={{ margin: "10px 20px" }}
          onClick={() => EditCat(item.id)}
        >
          Update
        </button>
        {isLoading ? <LoadingSpinner /> : CategoryItem}
      </Modal>
    </>
  );
};

export default CategoryItem;
