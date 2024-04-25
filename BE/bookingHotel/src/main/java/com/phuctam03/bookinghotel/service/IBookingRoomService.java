package com.phuctam03.bookinghotel.service;

import com.phuctam03.bookinghotel.model.BookingRoom;

import java.util.List;

public interface IBookingRoomService {

    List<BookingRoom> getAllBookings();

    BookingRoom findByBookingConfirmationCode(String confirmationCode);

    String saveBooking(Long roomId, BookingRoom bookingRequest);

    void cancelBooking(Long bookingId);
    List<BookingRoom> getBookingsByUserEmail(String email);
}
