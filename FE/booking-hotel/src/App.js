import "./App.css";
import AddRoom from "./components/room/AddRoom";
import ExistingRoom from "./components/room/ExistingRoom";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import EditRoom from "./components/room/EditRoom";
import Footer from "./components/layout/Footer";
import { RoomListing } from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import Checkout from "./components/bookings/Checkout";
import BookingSuccess from "./components/bookings/BookingSuccess";
import Booking from "./components/bookings/Booking";
import FindBooking from "./components/bookings/FindBooking";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import RequireAuth from "./components/auth/RequireAuth";
import NavBar from "./components/layout/NavBar";
import AuthProvider from "./components/auth/AuthProvider";
import DetailRoom from "./components/room/DetailRoom";
import UserList from "./components/userrs/UserList";
function App() {
  return (
    <AuthProvider>
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
          <Route
            path="/book-room/:roomId"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          ></Route>
          <Route path="/Booking-success" element={<BookingSuccess />} />
          <Route path="/existing-bookings" element={<Booking />} />
          <Route path="/find-booking" element={<FindBooking />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/logout" element={<Profile />}></Route>
          <Route path="/detail/room/:roomId" element={<DetailRoom />}></Route>
          <Route path="/userrs/list" element={<UserList />}></Route>
        </Routes>
        <Footer></Footer>
      </main>
    </AuthProvider>
  );
}

export default App;
