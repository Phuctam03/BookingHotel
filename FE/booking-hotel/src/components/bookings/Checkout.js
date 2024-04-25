import React, { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import * as apiFunction from "../utils/ApiFuntion";
import { useParams } from "react-router-dom";
import {
  FaCar,
  FaTshirt,
  FaTv,
  FaUtensils,
  FaWifi,
  FaWineGlassAlt,
} from "react-icons/fa";
import RoomCarousel from "../common/RoomCarousel";

export default function Checkout() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roominfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });

  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      apiFunction
        .getRoomById(roomId)
        .then((res) => {
          setRoomInfo(res);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 2000);
  }, [roomId]);

  return (
    <div>
      <section className="container">
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <p>Loading room information</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="room-info">
                <img
                  src={`data:image/png;base64,${roominfo.photo}`}
                  alt="RoomPhoto"
                  style={{ width: "100%", height: "200px" }}
                ></img>
                <table className="table table-bordered ">
                  <tbody>
                    <tr>
                      <th>room Type :</th>
                      <th>${roominfo.roomType}</th>
                    </tr>

                    <tr>
                      <th>room Price :</th>
                      <th>${roominfo.roomPrice}</th>
                    </tr>

                    <tr>
                      <th>Room Service:</th>
                      <td>
                        <ul>
                          <li>
                            <FaWifi /> WiFi
                          </li>
                          <li>
                            <FaTv /> Netflix Premium
                          </li>
                          <li>
                            <FaUtensils /> Breakfast
                          </li>
                          <li>
                            <FaWineGlassAlt /> Mini bar refreshment
                          </li>
                          <li>
                            <FaCar /> Car Service
                          </li>
                          <li>
                            <FaTshirt /> Laudry
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <BookingForm />
          </div>
        </div>
      </section>
      <div className="container">
        <RoomCarousel />
      </div>
    </div>
  );
}
