import React, { useEffect, useState } from "react";
import * as apiFunction from "../utils/ApiFuntion";
import Header from "../common/Header";
import BookingTable from "./BookingTable";

export default function Booking() {
  const [bookingInfo, setbookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      apiFunction
        .getAllBooking()
        .then((data) => {
          console.log(data);
          setbookingInfo(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    }, 1000);
  }, []);

  const handleBookingCancellation = async (bookingId) => {
    try {
      await apiFunction.cancelBooking(bookingId);
      const data = await apiFunction.getAllBooking();
      setbookingInfo(data);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <section style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Existing bookings"} />
      {error && <div className="text-danger">${error}</div>}
      {isLoading ? (
        <div>Loading existing bookings</div>
      ) : (
        <BookingTable
          bookinginfo={bookingInfo}
          handleBookingCanllation={handleBookingCancellation}
        />
      )}
    </section>
  );
}
