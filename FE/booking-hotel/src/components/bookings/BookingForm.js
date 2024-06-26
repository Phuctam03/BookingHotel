import React, { useEffect, useState } from "react";
import * as ApiFunction from "../utils/ApiFuntion";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment"; // thu vien format ngay thagn nam
import { Form } from "react-bootstrap";
import BookingSummary from "./BookingSummary";

export default function BookingForm() {
  const [validated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);

  const currentUser = localStorage.getItem("userId");
  const [booking, setBooking] = useState({
    guestName: "",
    guestEmail: currentUser,
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: "",
    numberOfChildren: "",
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const result = await ApiFunction.getRoomById(roomId);
      setRoomPrice(result.roomPrice);
    } catch (error) {
      throw new Error(error);
    }
  };

  const calculatePayment = () => {
    // ham diff để tính toán khoảng cách giữa ngày đặt phòng và ngày rời phòng là bao nhiêu
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate);
    const price = roomPrice ? roomPrice : 0;
    return price * diffInDays;
  };

  const isGuestValid = () => {
    const adultCount = parseInt(booking.numberOfAdults);
    const childrenCOunt = parseInt(booking.numberOfChildren);
    const totalCount = adultCount + childrenCOunt;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("check out date must be after check in date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget; // lay form hien tai
    if (
      form.checkValidity() === false ||
      !isGuestValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsValidated(true);
  };

  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await ApiFunction.bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
      // navigate chuyen toi trang booking-succes và một thông điệp với state : message
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card card-title">Phòng đặt</h4>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="guestName">Tên đầy đủ:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={booking.guestName}
                    placeholder="Enter your full name"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    xin điền đầy đủ thông tin
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="guestEmail">Email:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="guestEmail"
                    name="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Enter your  email"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    xin hãy nhập email
                  </Form.Control.Feedback>
                </Form.Group>
                <fieldset style={{ border: "2px" }}>
                  <legend>Hành Chờ</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="checkInDate">Ngày đến:</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={booking.checkInDate}
                        onChange={handleInputChange}
                        min={moment().format("MMM Do, YYYY")}
                      />
                      <Form.Control.Feedback type="invalid">
                        xin hãy chọn ngày đến
                      </Form.Control.Feedback>
                    </div>

                    <div className="col-6">
                      <Form.Label htmlFor="checkOutDate">Ngày Rời</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={booking.checkOutDate}
                        onChange={handleInputChange}
                        min={moment().format("MMM Do, YYYY")}
                      />
                      <Form.Control.Feedback type="invalid">
                        xin hãy chọn ngày rời
                      </Form.Control.Feedback>
                    </div>
                    {errorMessage && (
                      <p className="error-message text-danger">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </fieldset>

                <fieldset>
                  <legend>số khách hàng ở</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="numberOfAdults">
                        người trưởng thành :
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        id="numberOfAdults"
                        name="numberOfAdults"
                        value={booking.numberOfAdults}
                        min={1}
                        onChange={handleInputChange}
                        placeholder="0"
                      />
                      <Form.Control.Feedback type="invalid">
                        ít nhất 1 người trưởng thành.
                      </Form.Control.Feedback>
                    </div>

                    <div className="col-6">
                      <Form.Label htmlFor="numberOfChildren">
                        Trẻ con :
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        id="numberOfChildren"
                        name="numberOfChildren"
                        value={booking.numberOfChildren}
                        min={0}
                        onChange={handleInputChange}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="form-group mt-2 mb-2">
                  <button className="btn btn-hotel">Tiếp tục</button>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-md-6">
            {isSubmitted && (
              <BookingSummary
                booking={booking}
                payment={calculatePayment()}
                isFormValid={validated}
                onConfirm={handleFormSubmit}
              />
            )}
          </div>
        </div>
      </div>
      ;
    </>
  );
}
