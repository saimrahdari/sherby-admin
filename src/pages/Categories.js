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
import CategoryItem from "../components/CategoryItem";
import TableHeader from "../components/TableHeader";
import ProfilePicture from "../components/ProfilePicture";
import InputField from "../components/InputField";
import "../styles/categories.css";
import { FaWindows } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import filterImage from "../assets/filterImage.png";
const Categories = (props) => {
  const {
    categories,
    addCategory,
    addSubcategory,
    updatecategory,
    deletecategory,
  } = useGlobalState();
  const { locations } = useContext(GlobalContext);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [uid, setuid] = useState("");
  const [price, setprice] = useState("");
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

  const addNewCategory = async () => {
    setIsLoading(true);
    const newCategory = {
      data: {
        name: name.trim(),
        type: type.trim(),
        subcategories: {
          data: [],
        },
      },
      id: "",
    };
    try {
     
      //Add new
      const category = await addDoc(
        collection(db, "category"),
        newCategory.data
      );
      setName("");
      setType("");
      hideCatModal();
      newCategory.id = category.id;
      addCategory(newCategory);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const Addsubcat = async () => {
    setIsLoading(true);
    console.log(uid);
    const ref = doc(db, "category", uid);
    let index = {
      name: name,
      price:price,
      pic: "https://firebasestorage.googleapis.com/v0/b/salon-app-dd380.appspot.com/o/download%20(1).png?alt=media&token=25d7499c-7cd9-4ad0-878b-322d40de95d1"
    };
    try {
      const subcategory =    await updateDoc(ref, {
        subcategories: arrayUnion(index)
      });
window.location.reload(true)
    } catch (err) {
      console.log(err);
    }

    hideSubModal();
    setIsLoading(false);
  };

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
  console.log(categories);

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
        <button className="update-stylist-detail" style={{cursor:'pointer'}} onClick={Addsubcat}>
          Update
        </button>
        {isLoading ? <LoadingSpinner /> : Categories}
      </Modal>

      <Modal
        title="Adding New Category"
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
            placeholder="Category Name"
            value={name}
            changeHandler={updateName}
          />
          <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Enter Type"
            value={type}
            changeHandler={updateType}
          />
        </div>
        <button
          className="update-stylist-detail"
          style={{ margin: "10px 20px" ,cursor:'pointer'}}
          onClick={addNewCategory}
        
        >
          Update
        </button>
        {isLoading ? <LoadingSpinner /> : Categories}
      </Modal>
      <div className="table-header" style={{ width: "850px" }}>
        <h2>Categories</h2>

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
      {categories.map((item) => {
        return (
          <CategoryItem
            item={item}
            showModal={updateShowSubModal}
            deletecarmodel={deleteCatData}
          />
        );
      })}

      <div className="add-category-btn"  style={{cursor:'pointer'}} onClick={updateShowCatModal}>
        <span >Add Category</span>
      </div>
    </div>
  );
};

export default Categories;
