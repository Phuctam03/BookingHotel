import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function BookingSummary({
  booking,
  payment,
  isFormValid,
  onConfirm,
}) {
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProccessingPayment] = useState(false);
  const navigate = useNavigate();

  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, "days");

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  const handleConfirmBooking = () => {
    setIsProccessingPayment(true);
    setTimeout(() => {
      setIsProccessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  // ham chuyen thanh tien viet
  const formatToVND = (number) => {
    let formattedNumber = number.toLocaleString("vi-VN");
    formattedNumber += "d";
    return formattedNumber;
  };

  return (
    <div className="card card-body-mt-5">
      <div className="col-md-6"></div>
      <div className="card card-body mt-5">
        <h4 className="card-title">Reservation Summary</h4>
        <p>
          FullName :<strong>{booking.guestName}</strong>
        </p>
        <p>
          Email:<strong>{booking.guestEmail}</strong>
        </p>
        <p>
          Check-In Date :
          <strong>{moment(booking.checkInDate).format("DD-MM-YYYY")}</strong>
        </p>
        <p>
          Check-Out Date :
          <strong>{moment(booking.checkOutDate).format("DD-MM-YYYY")}</strong>
        </p>
        <p>
          Number of Days Booked:<strong>{numOfDays}</strong>
        </p>

        <div>
          <h5>Number of Guests</h5>
          <strong>
            Adult {booking.numberOfAdults > 1 ? "s" : ""} :
            {booking.numberOfAdults}
          </strong>
          <br />
          <strong>Children : {booking.numberOfChildren}</strong>
        </div>
        {payment > 0 ? (
          <>
            <p>
              ToTal Payment : <strong>{formatToVND(payment)}</strong>
            </p>

            {isFormValid && !isBookingConfirmed ? (
              <Button variant="success" onClick={handleConfirmBooking}>
                {isProcessingPayment ? (
                  <>
                    <span
                      className="spinner-border sprinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Booking Confirmed,redirecting to payment....
                  </>
                ) : (
                  "Confirm Booking and proceed to payment"
                )}
              </Button>
            ) : isBookingConfirmed ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading</span>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-danger">
            {" "}
            Check-out date must be after check-in-date
          </p>
        )}
      </div>
    </div>
  );
}
