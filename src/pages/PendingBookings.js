import { useGlobalState } from "../contexts/globalState";
import Table from "../components/Table";
import TableHeader from "../components/TableHeader";
import Footer from "../components/Footer";

import { db, auth, messaging } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,query,where
} from "firebase/firestore";
import "../styles/pendingBookings.css";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const PendingBookings = (props) => {
  const [isLoading, setIsLoading] = useState(false);
    const [userData, setuserData] = useState([]);
  const qpending = query(collection(db, "upcoming_bookings"), where("isApprroved", "==", 0));
  const getUser = async () => {
    setIsLoading(true);
    const getData = await getDocs(qpending);
    console.log(getData);
    setuserData(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
  };

  const { pendingBookings } = useGlobalState();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pendingBookings.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return (
    <>
    
    <div className="pending-bookings">
      <Table  title="Posts" data={currentPosts} />
      <Footer postsPerPage={postsPerPage} totalPosts={pendingBookings.length} paginate={paginate} currentPage={currentPage}/>
    </div>
   
    </>
  );

};

export default PendingBookings;
