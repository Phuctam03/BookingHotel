import React, { useState } from "react";
import MainHeader from "../layout/MainHeader";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const message = location.state && location.state.message;
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("userId")
  );
  setTimeout(() => {
    setCurrentUser("");
  }, 3000);
  return (
    <section>
      {message && <p className="text-primary px-5">{message}</p>}
      {currentUser && (
        <h6 className="text-success text-center">
          {" "}
          you are logged-In as {currentUser}
        </h6>
      )}
      <MainHeader />
      <section className="container">
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <HotelService />
        <Parallax />
        <RoomCarousel />
      </section>
    </section>
  );
};
export default Home;
