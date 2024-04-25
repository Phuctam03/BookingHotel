import React, { useState } from "react";
import * as Apifunction from "../utils/ApiFuntion";
import moment from "moment";
export default function FindBooking() {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [successfully, SetSuccessfully] = useState("");
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    room: {
      id: "",
      roomType: "",
    },
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numberOfAdults: "",
    numberOfChildren: "",
    totalNumberOfGuest: "",
  });
  const clearBookingInfo = {
    id: "",
    room: {
      id: "",
      roomType: "",
    },
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numberOfAdults: "",
    numberOfChildren: "",
    totalNumberOfGuest: "",
  };

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await Apifunction.getBookingByConfirmationCode(
        confirmationCode
      );
      setBookingInfo(data);
      setError(null);
    } catch (error) {
      setBookingInfo(clearBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBookingCancellation = async (bookingId) => {
    try {
      await Apifunction.cancelBooking(bookingId);
      setIsDeleted(true);
      SetSuccessfully("Booking has been cacelled successfully!");
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setTimeout(() => {
      SetSuccessfully("");
      setIsDeleted(false);
    }, 2000);
  };

  return (
    <>
      <div className="containermt-5 d-flex flex-column justify-content align-items-center">
        <h2>Find My Booking</h2>
        <form onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              className="form-control"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter the booking confirmation code"
            ></input>
            <button className="btn btn-hotel input-group-text">
              Find Booking
            </button>
          </div>
        </form>
        {isLoading ? (
          <div>Finding Your Booking...</div>
        ) : error ? (
          <div className="text-danger">Error : {error}</div>
        ) : bookingInfo.bookingConfirmationCode ? (
          <div className="col-md-6 mt-4 mb-5">
            <h3>Booking information</h3>
            <p className="text-success">
              Booking Confirmation Code : {bookingInfo.bookingConfirmationCode}
            </p>
            <p>Room Number : {bookingInfo.room.id}</p>
            <p>Room Type : {bookingInfo.room.roomType}</p>
            <p>
              check In Date :{" "}
              {moment(bookingInfo.checkInDate).format("DD-MM-YYYY")}
            </p>
            <p>
              check Out Date :{" "}
              {moment(bookingInfo.checkOutDate).format("DD-MM-YYYY")}
            </p>
            <p>guest name : {bookingInfo.guestName}</p>
            <p>guest Email : {bookingInfo.guestEmail}</p>
            <p>number of adults : {bookingInfo.numberOfAdults}</p>
            <p>number of children: {bookingInfo.numberOfChildren}</p>
            <p>total Guest: {bookingInfo.totalNumberOfGuest}</p>

            {!isDeleted && (
              <button
                className="btn btn-danger"
                onClick={() => handleBookingCancellation(bookingInfo.id)}
              >
                Cancle Booking
              </button>
            )}
          </div>
        ) : (
          <div>finding booking ...</div>
        )}
        {isDeleted && (
          <div className="alert alert-success mt-3" role="alert">
            {successfully}
          </div>
        )}
      </div>
    </>
  );
}
