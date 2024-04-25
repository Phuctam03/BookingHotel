import logo from "./logo.svg";
import "./App.css";
import AddRoom from "./components/room/AddRoom";
import RoomTypeSelector from "./components/common/RoomTypeSelector";
import ExistingRoom from "./components/room/ExistingRoom";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import EditRoom from "./components/room/EditRoom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import Checkout from "./components/bookings/Checkout";
import BookingSuccess from "./components/bookings/BookingSuccess";
import Booking from "./components/bookings/Booking";
import FindBooking from "./components/bookings/FindBooking";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
// import { AuthProvider } from "./components/auth/AuthProvider";

function App() {
  return (
    <>
      {/* <AuthProvider> */}
      <main>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/edit-room/:roomId" element={<EditRoom></EditRoom>} />
          <Route
            path="/existing-rooms"
            element={<ExistingRoom></ExistingRoom>}
          />
          <Route path="/add/room" element={<AddRoom></AddRoom>}></Route>
          <Route
            path="/browse-all-rooms"
            element={<RoomListing></RoomListing>}
          ></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/book-room/:roomId" element={<Checkout />}></Route>
          <Route path="/Booking-success" element={<BookingSuccess />} />
          <Route path="/existing-bookings" element={<Booking />} />
          <Route path="/find-booking" element={<FindBooking />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/logout" element={<Profile />}></Route>
        </Routes>
        <Footer></Footer>
      </main>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
