package com.phuctam03.bookinghotel.controller;

import com.phuctam03.bookinghotel.exception.InvalidBookingRequestException;
import com.phuctam03.bookinghotel.exception.ResourceNotFoundException;
import com.phuctam03.bookinghotel.model.BookingRoom;
import com.phuctam03.bookinghotel.model.Room;
import com.phuctam03.bookinghotel.response.BookingResponse;
import com.phuctam03.bookinghotel.response.RoomResponse;
import com.phuctam03.bookinghotel.service.BookingRoomService;
import com.phuctam03.bookinghotel.service.IBookingRoomService;
import com.phuctam03.bookinghotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingRoomController {

    private final IBookingRoomService bookingRoomService;
    private  final RoomService roomService;



    @GetMapping("/all-bookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        List<BookingRoom> bookings = bookingRoomService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookingRoom booking : bookings){
            BookingResponse bookingResponse = getBookingRespone(booking);
            System.out.println(bookingResponse.getCheckInDate());
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    private BookingResponse getBookingRespone(BookingRoom booking) {
        Optional<Room> theRoom = roomService.getRoomById(booking.getRoom().getId());
        RoomResponse room  = new RoomResponse(theRoom.get().getId(),
                theRoom.get().getRoomType(),
                theRoom.get().getRoomPrice());

        return  new BookingResponse(booking.getId(),
                booking.getCheckInDate()
                ,booking.getCheckOutDate(),
                booking.getGuestName(),
                booking.getGuestEmail(),
                booking.getNumberOfAdults(),
                booking.getNumberOfChildren(),
                booking.getTotalNumberOfGuest(),
                booking.getBookingConfirmationCode(),room);
    }


    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable("confirmationCode") String confirmationCode){
            try {
                BookingRoom booking = bookingRoomService.findByBookingConfirmationCode(confirmationCode);
                BookingResponse bookingResponse = getBookingRespone(booking);
                return  ResponseEntity.ok(bookingResponse);
            }catch (ResourceNotFoundException e){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
    }

    @GetMapping("/user/{email}/bookings")
    public  ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email){
        List<BookingRoom> bookingRooms = bookingRoomService.getBookingsByUserEmail(email);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookingRoom bookingRoom : bookingRooms){
            BookingResponse bookingResponse = getBookingRespone(bookingRoom);
            bookingResponses.add(bookingResponse);
        }
        return  ResponseEntity.ok(bookingResponses);
    }



    @PostMapping("/room/{roomId}/booking")
    public  ResponseEntity<?> saveBooking(@PathVariable("roomId") Long roomId,
                                          @RequestBody  BookingRoom bookingRequest ){

        try{
            String confirmationCode = bookingRoomService.saveBooking(roomId,bookingRequest);
            return  ResponseEntity.ok("Room booked successfully ! Your booking confirmationCode is : "+confirmationCode);
        }catch (InvalidBookingRequestException e){
            return  ResponseEntity.badRequest().body(e.getMessage());

        }
    }


    @DeleteMapping("/booking/{bookingId}/delete")
    public  void cancelBooking(@PathVariable("bookingId") Long bookingId){
        bookingRoomService.cancelBooking(bookingId);
    }

}
