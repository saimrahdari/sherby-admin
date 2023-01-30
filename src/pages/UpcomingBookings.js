import Table from "../components/Table";
import TableHeader from "../components/TableHeader";
import Footer from "../components/Footer";
import "../styles/upcomingBookings.css";
import { useGlobalState } from "../contexts/globalState";
import { useState } from "react";

const UpcomingBookings = (props) => {
  const { upcomingBookings } = useGlobalState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = upcomingBookings.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
 
  return (
    <div className="upcoming-bookings">
      <Table title="Upcoming Bookings" data={currentPosts} />
      <Footer postsPerPage={postsPerPage} totalPosts={upcomingBookings.length} paginate={paginate} currentPage={currentPage} />
    </div>
  );
};

export default UpcomingBookings;
