package com.phuctam03.bookinghotel.repository;

import com.phuctam03.bookinghotel.model.BookingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRoomRepository extends JpaRepository<BookingRoom,Long> {


    List<BookingRoom> findByRoomId(Long roomId);
   Optional<BookingRoom> findBookingRoomByBookingConfirmationCode(String confirmationCode);

   List<BookingRoom> findByGuestEmail(String email);
}
