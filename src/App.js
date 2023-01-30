import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NavigationPanel from "./components/NavigationPanel";
import PendingBookings from "./pages/PendingBookings";
import UpcomingBookings from "./pages/UpcomingBookings";
import Locations from "./pages/Locations";
import Stylists from "./pages/Stylists";
import Categories from "./pages/Categories.js";
import Container from "./components/Container";
import Header from "./components/Header";
import Settings from "./pages/Settings";
import "./styles/app.css";
import Notifications from "./pages/Notifications";
import Users from "./pages/Users";
import BookingDetails from "./pages/BookingDetails";
import Slots from "./pages/Slots";
import CreateAlert from "./pages/CreateAlert";
import DetailTbody from "./components/DetailTbody";
import History from "./pages/History";

function App() {
  return (
    <div className="app">
      <NavigationPanel />
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pending-bookings" element={<PendingBookings />} />
          <Route path="/upcoming-bookings" element={<UpcomingBookings />} />
          <Route path="/history" element={<History />} />
          <Route path="/branch" element={<Locations />} />
          <Route path="/stylists" element={<Stylists />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/users" element={<Users />} />
          <Route path="/booking-details" element={<BookingDetails />} />
          <Route path="/detail" element={<DetailTbody />} />
          <Route path="/slots" element={<Slots />} />
          <Route path="/createalert" element={<CreateAlert />} />
        </Routes> 
      </Container>
      {/* container 
              -Header
              -Table
                  --Table Header
                  --Table Content
              -Footer
        */}
    </div>
  );
}

export default App;
