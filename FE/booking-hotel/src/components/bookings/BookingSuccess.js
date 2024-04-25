import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";

export default function BookingSuccess() {
  const location = useLocation(); // hook này dùng để lấy đường dẫn hiện tại khi component này được gọi tới
  const message = location.state?.message;
  const error = location.state?.error;

  return (
    <div className="container">
      <Header title="Booking success" />
      <div className="mt-5">
        {message ? (
          <div>
            <h3 className="text-success">Booking Success</h3>
            <p className="text-success">{message}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-danger">Booking error</h3>
            <p className="text-success">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
