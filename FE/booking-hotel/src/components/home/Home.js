import React from "react";
import MainHeader from "../layout/MainHeader";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";

export default function Home() {
  return (
    <section>
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
}