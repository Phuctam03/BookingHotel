import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log(token);
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  } else {
    return null;
  }
};

/* this function add new Room*/
export const addRoom = async (photo, roomType, roomPrice) => {
  const tokenHeader = getHeader();
  console.log(tokenHeader);
  if (!tokenHeader) {
    return false;
  }
  if (!photo || !roomType || !roomPrice) {
    return false;
  }
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);
  try {
    const response = await api.post("/rooms/add/new-room", formData, {
      headers: tokenHeader,
    });
    console.log(response);
    return response.status === 200;
  } catch (error) {
    console.error("Error adding new Room :", error);
    return false;
  }
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

// this function get all rooms from database
export async function getAllRooms() {
  try {
    const respone = await api.get("rooms/list/room");
    return respone.data;
  } catch (error) {
    throw new Error("Error fetching rooms");
  }
}

// this function deletes a room by the id
export const deleteRoom = async (roomId) => {
  try {
    const respone = await api.delete(`/rooms/delete/room/${roomId}`, {
      headers: getHeader(),
    });
    return respone.data;
  } catch (error) {
    throw new Error(`Error deleting room ${error.message}`);
  }
};

// this is function update room from database

export const updateRoom = async (roomId, roomData) => {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);
  const respone = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: getHeader(),
  });
  return respone;
};

// this is function get roomByid from the database

export const getRoomById = async (roomId) => {
  try {
    const respone = await api.get(`/rooms/room/${roomId}`);
    return respone.data;
  } catch (error) {
    throw new Error(`Error fetching room ${error.message}`);
  }
};

export const bookRoom = async (roomId, booking) => {
  try {
    const response = await api.post(
      `/bookings/room/${roomId}/booking`,
      booking
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error booking room : ${error.message}`);
    }
  }
};

export const getAllBooking = async () => {
  try {
    const respone = await api.get("/bookings/all-bookings", {
      headers: getHeader(),
    });
    return respone.data;
  } catch (err) {
    throw new Error(`Error fetching bookings : ${err.message}`);
  }
};

export const getBookingByConfirmationCode = async (confirmationCode) => {
  try {
    const respone = await api.get(`/bookings/confirmation/${confirmationCode}`);
    console.log(respone);

    return respone.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error find booking : ${error.message}`);
    }
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const respone = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return respone.data;
  } catch (error) {
    throw new Error(`Error cancelling booking : ${error.message}`);
  }
};

export const getAvailableRooms = async (
  checkInDate,
  checkOutDate,
  roomType
) => {
  try {
    const response = await api.get(
      `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const registration = async (registration) => {
  try {
    const response = await api.post(`/auth/register-user`, registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User registration error:${error.message}`);
    }
  }
};

export const login = async (login) => {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserProfile = async (userId, token) => {
  try {
    const response = await api.get(`users/profile/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {}
};

export const getUser = async (userId, token) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getBookingsByUserId = async (userId, token) => {
  try {
    const response = await api.get(`/bookings/user/${userId}/bookings`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching bookings:${error.message}`);
    throw new Error("Failed to fetch bookings");
  }
};
