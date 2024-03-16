import React, { useEffect, useState } from "react";
import * as ApiRoom from "../utils/ApiFuntion";

export default function RoomTypeSelector({ handleRoomInputChange, newRoom }) {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    ApiRoom.getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypesInput(false);
    }
  };

  if (!roomTypes) return null;

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            className="form-control mb-3"
            id="roomType"
            name="roomType"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add new") {
                setShowNewRoomTypesInput(true);
              } else {
                handleRoomInputChange(e);
              }
            }}
          >
            <option value={""}>select a room type</option>
            <option value={"Add new"}>Add new</option>
            {roomTypes.map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
          {showNewRoomTypeInput && (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter a new room Type"
                onChange={handleNewRoomTypeInputChange}
              ></input>
              <button
                className="btn btn-outline-dark"
                type="button"
                onClick={handleAddNewRoomType}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
