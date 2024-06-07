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
        <h4 className="card-title">Đặt phòng</h4>
        <p>
          Tên Đầy đủ :<strong>{booking.guestName}</strong>
        </p>
        <p>
          Email:<strong>{booking.guestEmail}</strong>
        </p>
        <p>
          Ngày đến
          <strong>{moment(booking.checkInDate).format("DD-MM-YYYY")}</strong>
        </p>
        <p>
          Ngày Rời
          <strong>{moment(booking.checkOutDate).format("DD-MM-YYYY")}</strong>
        </p>
        <p>
          Số ngày ở lại:<strong>{numOfDays}</strong>
        </p>

        <div>
          <h5>Số khách Hàng</h5>
          <strong>
            Số lượng người lớn {booking.numberOfAdults > 1 ? "s" : ""} :
            {booking.numberOfAdults}
          </strong>
          <br />
          <strong>Số lượng trẻ con : {booking.numberOfChildren}</strong>
        </div>
        {payment > 0 ? (
          <>
            <p>
              Tổng tiền : <strong>{formatToVND(payment)}</strong>
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
                    Đang thanh toán....
                  </>
                ) : (
                  "Chấp nhận và đang thanh toán"
                )}
              </Button>
            ) : isBookingConfirmed ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Đang tải dữ liệu</span>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-danger"> Ngày rời phòng phải sau ngày ở lại</p>
        )}
      </div>
    </div>
  );
}
