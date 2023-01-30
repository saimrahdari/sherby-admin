import {
  IoStarSharp,
  IoAddCircleOutline,
  IoPencil,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import "../styles/stylistCard.css";
import ProfilePicture from "./ProfilePicture";
import { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { useGlobalState } from "../contexts/globalState";
import { HiLocationMarker } from "react-icons/hi";
import TableHeader from "../components/TableHeader";
import InputField from "../components/InputField";
import Modal from "../components/Modal";
import "../styles/stylists.css";
import DropdownMenu from "../components/DropdownMenu";
import { GlobalContext } from "../contexts/globalState";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
const StylistCard = (props) => {
  const { rating, picture, name, id, location, City } = props.item;
  const { locations } = useContext(GlobalContext);

  const [show, setShow] = useState(false);
  const hideModal = () => setShow(false);
  const [show1, setShow1] = useState(false);
  const hideModal1 = () => setShow1(false);
  const { addStylist } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setselected] = useState(["Select City"]);
  const [selected1, setselected1] = useState(["Select Branch"]);
  const [Name, setName] = useState("");
  const [Location, setLocation] = useState("");
  const [city, setcity] = useState("");
  const [Image, setImage] = useState("");
  const [rate, setrate] = useState("");
  const [image, setimage] = useState({});

  const renderStars = () => {
    const data = [];
    for (let i = 0; i < rating; i++) {
      data.push(<IoStarSharp className="star" />);
    }

    return data;
  };

  const rats = (ret) => {
    setrate(ret);
  };

  const addName = (e) => setName(e.target.value);
  const addLocation = (e) => setLocation(e.target.value);
  const addCity = (e) => setcity(e.target.value);
  const addimg = (e) => setImage(e.target.files[0]);
  const changeimage = (e) => setimage(e.target.files[0]);

  console.log(image.name);
  const addUser = async () => {
    setIsLoading(true);
    const useriamge = ref(storage, `${image.name}`);
    await uploadBytes(useriamge, image);
    const imageuser = await getDownloadURL(useriamge);

    // const refrence = collection(db, "stylist");

    const Stylistdata = {
      name: Name,
      City: selected,
      location: selected1,
      rating: rate,
      picture: imageuser,
    };
    try {
      //Add new
      const stylist = await addDoc(collection(db, "stylist"), Stylistdata);
      setName("");
      setselected("");
      setselected1("");
      setImage("");
      hideModal();
      Stylistdata.id = stylist.id;
      addStylist(Stylistdata);
    } catch (err) {
      console.log(err);
    }
    window.location.reload(true);
    setIsLoading(false);
  };
  let streetdropdownarray = [];

  const hiddenFileInput = React.useRef(null);
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    setimage(fileUploaded);
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      {/* hover dropdown  */}
     
      <div className={!props.className ? "dropdown" : ""}>
        <div className={props.className ? props.className : "stylist-card"}>
          {props.className ? (
            <IoAddCircleOutline
              onClick={() => setShow(true)}
              style={{ cursor: "pointer" }}
              className="icon"
            />
          ) : (
            <ProfilePicture
              picture={picture}
              imgStyle={{ width: "45px", height: "45px" }}
            />
          )}

          <p>{name}</p>
          <div className="rating">{renderStars()}</div>
        </div>
        <div className="dropdown-content">
          <div onClick={() => props.showModal(id)}>
            <IoPencil className="icon" /> Edit Details
          </div>
          <div onClick={() => setShow1(true)}>
            <IoInformationCircleOutline className="icon" /> Show Details
          </div>
         
          <div onClick={() => props.deleteStylist(id)}>
            <FaTrash className="icon" /> Delete
          
                 
        </div>
       
      
        </div>
        {props.isLoading ? <LoadingSpinner /> : StylistCard}
      </div>
    
      {/* add stylist */}
      <Modal
        title="Details"
        show={show}
        hideModal={hideModal}
        contentStyle={{ height: "400px" }}
      >
        <div className="picture-container">
          {/* <div className="add-picture"></div> */}
          {/* <ProfilePicture imgStyle={{ width: "45px", height: "45px" }} /> */}
          {/* <InputField type="file" value="" changeHandler={addimg} /> */}
        </div>
        <div className="input-fields-container">
          {/* <button
            style={{ backgroundColor: "#e6b970", cursor: "pointer",padding:2 }}
            onClick={handleClick}
          >
            Upload Picture
          </button> */}
          <input
         
            type="file"
            // ref={hiddenFileInput}
            onChange={handleChange}
            style={{fontSize:"14px",alignItems:"center", height:"30px",justifyContent:"center", backgroundColor: "#e6b970", cursor: "pointer",padding:2,  }}
          />

          {/* <InputField
            id="file"
            type="file"
            fieldStyle={{ height: "25px" }}
            placeholder="Enter stylist name"
            changeHandler={changeimage}
          /> */}
         

          {/* <DropdownMenu title={selected1}>
            {locations.map((item, ind) => {
              if (item.data.city === selected) {
                streetdropdownarray = item.data.street;
                console.log(streetdropdownarray);
                return (
                  <>
                    {" "}
                    {streetdropdownarray.map((val, ind) => (
                      <div key={ind} onClick={() => setselected1(val)}>
                        {val}
                      </div>
                    ))}
                  </>
                );
              }
            })}
          </DropdownMenu> */}
         
          <div class="flex items-center">
            <svg
              aria-hidden="true"
              onClick={() => rats("1")}
              class={
                rate >= 1
                  ? "w-5 h-5 text-yellow-400"
                  : "w-5 h-5 text-gray-300 dark:text-gray-500"
              }
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>First star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              onClick={() => rats("2")}
              class={
                rate >= 2
                  ? "w-5 h-5 text-yellow-400"
                  : "w-5 h-5 text-gray-300 dark:text-gray-500"
              }
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Second star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              onClick={() => rats("3")}
              class={
                rate >= 3
                  ? "w-5 h-5 text-yellow-400"
                  : "w-5 h-5 text-gray-300 dark:text-gray-500"
              }
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Third star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              onClick={() => rats("4")}
              class={
                rate >= 4
                  ? "w-5 h-5 text-yellow-400"
                  : "w-5 h-5 text-gray-300 dark:text-gray-500"
              }
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Fourth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              onClick={() => rats("5")}
              class={
                rate >= 5
                  ? "w-5 h-5 text-yellow-400"
                  : "w-5 h-5 text-gray-300 dark:text-gray-500"
              }
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Fifth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
        </div>

        <InputField
            fieldStyle={{ height: "35px" }}
            placeholder="Enter stylist name"
            value={Name}
            changeHandler={addName}
          />
        <DropdownMenu title={selected}>
          {locations.map((item, ind) => {
            return (
              <div key={ind} onClick={() => setselected(item.data.branch)}>
                {item.data.branch}
              </div>
            );
          })}
        </DropdownMenu>
        <button
          onClick={addUser}
          style={{ cursor: "pointer" }}
          className="update-stylist-detail"
        >
          Add
        </button>
        {isLoading ? <LoadingSpinner /> : StylistCard}
      </Modal>
      {/* details Modal stylist */}
      <Modal
        title="Details"
        show={show1}
        hideModal={hideModal1}
        contentStyle={{ height: "350px" }}
      >
        <div className="picture-container">
          {/* <div className="add-picture"></div> */}
          <ProfilePicture
            picture={picture}
            imgStyle={{ width: "45px", height: "45px" }}
          />
        </div>
        <div className="input-fields-container" style={{marginBottom:"130px"}}>
          <InputField fieldStyle={{ height: "30px", }} placeholder={name} />
          <InputField
            icon={HiLocationMarker}
            fieldStyle={{ height: "30px" }}
            placeholder={City}
            disabled={true}
          />
          {/* <InputField
            icon={HiLocationMarker}
            fieldStyle={{ height: "30px" }}
            placeholder={location}
          /> */}
          <div className="rating flex " style={{ color: "#E4B76F" }}>
            {renderStars()}
          </div>
        </div>
      </Modal>
     
    </>
  );
};

export default StylistCard;
