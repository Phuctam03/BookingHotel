import React, { useEffect } from "react";
import * as ApiRoom from "../utils/ApiFuntion";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";

export default function EditRoom() {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });
  const { roomId } = useParams();

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  const fetchRoom = async () => {
    try {
      const roomData = await ApiRoom.getRoomById(roomId);
      setRoom(roomData);
      setImagePreview(roomData.photo);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
    console.log(123);
  };

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respone = await ApiRoom.updateRoom(roomId, room);
      if (respone.status === 200) {
        setSuccessMessage("Room updated succesfully!");
        const updateRoomData = await ApiRoom.getRoomById(roomId);
        setRoom(updateRoomData);
        setImagePreview(updateRoomData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updatring room");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <>
        <section className="container mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <h2 className="mt-5  mb-2">Update Room</h2>
              {successMessage && (
                <div className="alert alert-success fade show">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-danger fade show">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="roomType">
                    Room Type
                  </label>
                  <div>
                    <RoomTypeSelector
                      handleRoomInputChange={handleRoomInputChange}
                      newRoom={room}
                    ></RoomTypeSelector>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="roomPrice">
                    Room Price
                  </label>
                  <input
                    className="form-control"
                    required // yeu cau phai nhap
                    id="roomPrice"
                    name="roomPrice"
                    value={room.roomPrice}
                    type="number"
                    onChange={handleRoomInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="photo">
                    Room Photo
                  </label>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview Room Photo"
                      style={{ maxWidth: "400px", maxHeight: "400px" }}
                      className="mb-3"
                    ></img>
                  )}
                </div>
                <div className="d-grid d-md-flex mt-2 gap-2">
                  <Link
                    to={"/existing-rooms"}
                    className="btn btn-outline-info ml-5"
                  >
                    back
                  </Link>
                  <button
                    className="btn btn-outline-primary ml-5"
                    type="submit"
                  >
                    Update Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    </div>
  );
}
