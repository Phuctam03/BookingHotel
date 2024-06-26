import React, { useEffect, useState } from "react";
import * as apiFunction from "../utils/ApiFuntion";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: [
      {
        id: "",
        name: "",
      },
    ],
  });

  const [bookings, setBookings] = useState([
    {
      id: "",
      room: {
        id: "",
        roomType: "",
      },
      checkInDate: "",
      checkOutDate: "",
      bookingConfirmtionCode: "",
    },
  ]);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchUser();
  }, [userId]);

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const userData = await apiFunction.getUser(userId, token);
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBookings = async () => {
    try {
      const bookingData = await apiFunction.getBookingsByUserId(userId, token);
      setBookings(bookingData);
    } catch (error) {
      console.error(`Error fetching bookings:`, error.message);
      setErrorMessage(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?This action cannot be undone."
    );
    if (confirmed) {
      await apiFunction
        .deleteUser(userId)
        .then((res) => {
          setMessage(res.data);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRole");
          navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          setErrorMessage(err.data);
        });
    }
  };

  return (
    <div className="container">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {message && <p className="text-danger">{message}</p>}
      {user ? (
        <div
          className="card p-5 mt-5"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <h4 className="card-title text-center">Thông tin người dùng</h4>
          <div className="card-body">
            <div className="col-md-10 mx-auto">
              <div className="card mb-3 shadow">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <img
                        src="src\assets\images\room7.jpg"
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-10">
                    <div className="card-body">
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-blod">
                          ID:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.id}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Tên
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.lastName}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Email:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.email}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Vai trò:
                        </label>
                        <div className="col-md-10">
                          <ul className="list-unstyled">
                            {user.roles.map((role) => (
                              <li key={role.id} className="card-text">
                                {role.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="card-title text-center">Booking History</h4>
              {bookings.length > 0 ? (
                <table className="table table-bordered table-hover shadow">
                  <thead>
                    <tr>
                      <th scope="col">Booking ID</th>
                      <th scope="col">Room ID</th>
                      <th scope="col">Room Type</th>
                      <th scope="col">Check In Date</th>
                      <th scope="col">Check Out Date</th>
                      <th scope="col">Confirmation Code</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking.id}</td>
                        <td>{booking.room.id}</td>
                        <td>{booking.room.roomType}</td>
                        <td>
                          {moment(booking.checkInDate).format("DD-MM-YYYY")}
                        </td>
                        <td>
                          {moment(booking.checkOutDate).format("DD-MM-YYYY")}
                        </td>
                        <td>{booking.bookingConfirmationCode}</td>
                        <td className="text-success">đang sử dụng</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>bạn chưa có phòng nào được đặt.</p>
              )}
              <div className="d-flex justify-content-center">
                <div className="mx-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleDeleteAccount}
                  >
                    xóa tài khoản
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>đang tải dữ liệu</p>
      )}
    </div>
  );
}
