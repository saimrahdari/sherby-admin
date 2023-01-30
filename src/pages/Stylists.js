import React, { useContext, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import filterImage from "../assets/filterImage.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { useGlobalState } from "../contexts/globalState";
import { HiLocationMarker } from "react-icons/hi";
import StylistCard from "../components/StylistCard";
import TableHeader from "../components/TableHeader";
import InputField from "../components/InputField";
import Modal from "../components/Modal";
import ProfilePicture from "../components/ProfilePicture";
import "../styles/stylists.css";
import { GlobalContext } from "../contexts/globalState";
import DropdownMenu from "../components/DropdownMenu";
import LoadingSpinner from "../components/LoadingSpinner";

const Stylists = (props) => {
  const { stylists, updateStylist, deleteStylist } = useGlobalState();
  const { locations } = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [stylistId, setStylistId] = useState(null);
  const [image, setimage] = useState({});
  const [selected, setselected] = useState(["Select City"]);
  const [selected1, setselected1] = useState(["Select Branch"]);
  const changeimage = (e) => setimage(e.target.files[0]);
  const [isLoading, setIsLoading] = useState(false);
  const showModal = (id) => {
    setStylistId(id);
    setShow(true);
  };

  const hideModal = () => setShow(false);
  const updateName = (e) => setName(e.target.value);

  const updateStylistData = async () => {
    setIsLoading(true);
    const useriamge = ref(storage, `${image.name}`);
    await uploadBytes(useriamge, image);
    const imageuser = await getDownloadURL(useriamge);

    let stylistedit = {};
    if (name !== "" && selected !== "Select City" && imageuser !== "") {
      stylistedit = {
        name: name,
        City: selected,
        location: selected1,
        picture: imageuser,
      };
    }

    if (name !== "" && selected === "Select City" && imageuser === "") {
      stylistedit = {
        name: name,
      };
    }

    if (name === "" && selected !== "Select City" && imageuser === "") {
      stylistedit = {
        City: selected,
      };
    }

    if (name === "" && selected === "Select City" && imageuser !== "") {
      stylistedit = {
        picture: imageuser,
      };
    }
    if (name !== "" && selected !== "Select City" && imageuser === "") {
      stylistedit = {
        name: name,
        City: selected,
      };
    }

    if (name === "" && selected !== "Select City" && imageuser !== "") {
      stylistedit = {
        City: selected,
        picture: imageuser,
      };
    }

    if (name !== "" && selected === "Select City" && imageuser !== "") {
      stylistedit = {
        name: name,
        picture: imageuser,
      };
    }

    const refence = doc(db, "stylist", stylistId);
    try {
      await updateDoc(refence, stylistedit);
      hideModal(false);
      updateStylist(stylistId, name);
    } catch (err) {
      console.log(err);
    }
    setselected("Select City");
    setselected1("Select Branch");
    setName("");
    hideModal();
    window.location.reload(true);
    setIsLoading(false);
  };

  const deleteStylistData = async (id) => {
    setIsLoading(true);
    const ref = doc(db, "stylist", id);
    try {
      await deleteDoc(ref);
      deleteStylist(id);
    } catch (err) {
      console.log(err);
    }
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
    <div className="stylists">
      {/*Update Stylist Details  */}
      <Modal
        title="Details"
        show={show}
        hideModal={hideModal}
        contentStyle={{ height: "400px" }}
      >
        <div className="picture-container">
          {/* <div className="add-picture"></div> */}
        </div>
        <div className="input-fields-container" style={{marginBotton:10}}>
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
            style={{fontSize:"14px",alignItems:"center", height:"30px",justifyContent:"center", backgroundColor: "#e6b970", cursor: "pointer",padding:2  }}
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
        </div>
        <InputField
            fieldStyle={{ height: "30px" }}
            placeholder="Enter stylist name"
            value={name}
            changeHandler={updateName}
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
          className="update-stylist-detail"
          style={{ cursor: "pointer" }}
          onClick={updateStylistData}
        >
          Update
        </button>
        {isLoading ? <LoadingSpinner /> : Stylists}
      </Modal>

      {/* displating card of stylist  */}
      <div className="table-header" style={{ width: "800px", marginBottom: "20px"}}>
      <h2>Stylists</h2>

      <div className="container">
        <div
          className="center-container"
          style={{ width: "100%", justifyContent: "right" }}
        >
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
              <label>Branch:</label>
              <select
                className="block p-2 m-1 max-w-sm text-sm outline-none"
                style={{
                  backgroundColor: "rgba(52, 52, 52, 0)",
                  border: "0 !important",
                  boxShadow: "0 !important",
                  border: "0 !important",
                  cursor: "pointer",
                }}
                onChange={(e) => {
                  if (e.target.value == "All") {
                    setLocation("");
                  } else {
                    setLocation(e.target.value);
                  }
                }}
              >
                <option>All</option>
                {locations.map((val, ind) => (
                  <option>{val.data.branch}</option>
                ))}
              </select>
            </div>
            <img src={filterImage} alt=""></img>
          </div>
        </div>
      </div>
    </div>
      {/* <TableHeader
        title="Stylists"
        style={{ width: "800px", marginBottom: "20px" }}
      /> */}
      <div className="cards-container">
        {stylists.map((item) => {
          if (item.data.City == location || location == "") {
          return (
            <StylistCard
              key={item.id}
              item={item.data}
              id={item.id}
              showModal={showModal.bind(this, item.id)}
              hideModal={hideModal}
              deleteStylist={deleteStylistData.bind(this, item.id)}
             location={location}
            />
          );
        }})}
        <StylistCard className="add-card" item={{ name: "Add Stylist" }}  isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Stylists;
