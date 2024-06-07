import React from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <section className="container mt-5">
      <h2>Welcome to Admin Panel</h2>
      <hr />
      <Link to={"/existing-rooms"}>Quản Lý Phòng</Link>
      <br />
      <Link to={"/existing-bookings"}>Quản Lý Đặt Phòng</Link>
      <br />
      <Link to={"/userrs/list"}>Quản lý người dùng</Link>
    </section>
  );
}
