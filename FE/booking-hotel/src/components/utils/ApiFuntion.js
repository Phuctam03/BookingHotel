import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

/* this function add new Room*/
export const addRoom = async (photo, roomType, roomPrice) => {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const respone = await api.post("/rooms/add/new-room", formData);
  return respone.status === 200 ? true : false;
};

/** this function get room type from the database */
export const getRoomTypes = async () => {
  try {
    const respone = await api.get("/rooms/room/types");
    if (respone.status === 200) {
      return respone.data;
    } else {
      const error = "Error fetching data";
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
