import React from 'react'
import { useGlobalState } from "../contexts/globalState";
import Table from "../components/Table";
import TableHeader from "../components/TableHeader";
import Footer from "../components/Footer";
import "../styles/pendingBookings.css";
import { useState } from "react";
const History = () => {
    const { completedBookings } = useGlobalState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(5);
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts =completedBookings.slice(indexOfFirstPost, indexOfLastPost);
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
      <div className="pending-bookings">
        <Table  title="Completed Bookings" data={currentPosts} />
        <Footer postsPerPage={postsPerPage} totalPosts={completedBookings.length} paginate={paginate} currentPage={currentPage}/>
      </div>
    );
}

export default History