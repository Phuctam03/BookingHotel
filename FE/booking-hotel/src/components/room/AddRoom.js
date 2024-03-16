import React, { useState } from "react";
import * as ApiRoom from "../utils/ApiFuntion";
import RoomTypeSelector from "../common/RoomTypeSelector";

export default function AddRoom() {
  const [room, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    setNewRoom({ ...room, [name]: value });
  };

  /* phuong thuc de chon anh*/
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
    console.log(123);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addRoom = await ApiRoom.addRoom(
        room.photo,
        room.roomType,
        room.roomPrice
      );

      if (addRoom !== undefined) {
        setSuccessMessage("A new room was added to the database");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding room ");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <div>
      <>
        <section className="container,mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <h2 className="mt-5  mb-2">Add New Room</h2>
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

                <div className="d-grid d-md-flex mt-2">
                  <button className="btn btn-outline-primary ml-5">
                    Save Room
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
