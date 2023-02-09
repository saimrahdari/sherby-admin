
import { useContext, useEffect, useState } from "react";
import { GlobalContext, useGlobalState } from "../contexts/globalState";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import { AiFillCaretDown } from "react-icons/ai";
import Modal from "../components/Modal";
import CouponItem from "../components/CouponItem";
import TableHeader from "../components/TableHeader";
import ProfilePicture from "../components/ProfilePicture";
import InputField from "../components/InputField";
import "../styles/categories.css";
import { FaWindows } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import filterImage from "../assets/filterImage.png";
const CouponCode = (props) => {
  const {
    coupons,
    addCoupons,
    updatecoupon,
    deletecoupon,
  } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [uid, setuid] = useState("");
  const [price, setprice] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("")
  const [showmodalforedit, setshowmodalforedit] = useState(false);

  const updateShowSubModal = (id) => {
    setShowSubModal(true);
    setuid(id);
  };

  const updateShowCatModal = (id) => {
    setshowmodalforedit(false);
    setShowCatModal(true);
  };

  const hideSubModal = () => setShowSubModal(false);
  const hideCatModal = () => setShowCatModal(false);
  const updateName = (e) => setName(e.target.value);
  const updateType = (e) => setType(e.target.value);
  const updateprice = (e) => setprice(e.target.value);

  const addNewCoupon = async () => {
    setIsLoading(true);
    const newCategory = {
      data: {
        name: name.trim(),
        type: type.trim(),
        categoryIcon: categoryIcon
      },
      id: "",
    };
    try {
     
      //Add new
      const category = await addDoc(
        collection(db, "couponcodes"),
        newCategory.data
      );
      setName("");
      setType("");
      hideCatModal();
      newCategory.id = category.id;
      addCoupons(newCategory);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    
  };


  const deleteCouponData = async (id) => {
    setIsLoading(true);
    console.log("moix");
    const ref = doc(db, "couponcodes", id);
    try {
      const del = await deleteDoc(ref);

      deletecoupon(id);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  console.log("Couponss", coupons);

  return (
    <div className="categories">
      <Modal
        title="Sub Category Details"
        show={showSubModal}
        hideModal={hideSubModal}
        // contentStyle={{ height: "350px" }}
      >
        {/* <div className="picture-container">
          <ProfilePicture imgStyle={{ width: "45px", height: "45px" }} />
          <span>Update picture</span>
        </div> */}
        <div className="input-fields-container" style={{ marginTop: 80 }}>
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Sub Category name"
            value={name}
            changeHandler={updateName}
          />
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Enter Price"
            value={price}
            changeHandler={updateprice}
          />
        </div>
        {isLoading ? <LoadingSpinner /> : CouponCode}
      </Modal>

      <Modal
        title="Add New Coupon Code"
        show={showCatModal}
        hideModal={hideCatModal}
        contentStyle={{ height: "350px" }}
      >
        <div className="picture-container">
          {/* <ProfilePicture imgStyle={{ width: "45px", height: "45px" }} />
          <span>Update picture</span> */}
        </div>
        <div className="input-container ">
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Coupon Code"
            value={name}
            changeHandler={updateName}
          />
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Coupon Type"
            value={type}
            changeHandler={updateType}
          />
        </div>
        <button
          className="update-stylist-detail"
          style={{ margin: "10px 20px" ,cursor:'pointer'}}
          onClick={addNewCoupon}
        
        >
          Update
        </button>
        {isLoading ? <LoadingSpinner /> : CouponCode}
      </Modal>
      <div className="table-header" style={{ width: "850px" }}>
        <h2>Coupon Codes</h2>

        <div className="container">
          <div
            className="center-container"
            style={{ width: "100%", justifyContent: "right" }}
          >
            {props.default ? (  
              <div className="location">
                Default <AiFillCaretDown className="icon small" />
              </div>
            ) : (
              ""
            )}
            <div className="center-container">
              <div
                className="location"
                style={{
                  height: "fit-content",
                  width: "fit-content",
                  borderRadius: 25,
                }}
              >
                {/* <HiLocationMarker className="icon" /> Location: All
              <AiFillCaretDown className="icon small" /> */}
              
              
              </div>
             
            </div>
          </div>
        </div>
      </div>
      {/* <TableHeader title="Categories" style={{ width: "850px" }} /> */}
      {coupons.map((item) => {
        return (
          <CouponItem
            item={item}
            showModal={updateShowSubModal}
            deletecarmodel={deleteCouponData}
          />
        );
      })}

      <div className="add-category-btn"  style={{cursor:'pointer'}} onClick={updateShowCatModal}>
        <span >Add Coupon Code</span>
      </div>
    </div>
  );
};

export default CouponCode;
