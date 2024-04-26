package com.phuctam03.bookinghotel.service;


import com.phuctam03.bookinghotel.exception.InvalidBookingRequestException;
import com.phuctam03.bookinghotel.exception.ResourceNotFoundException;
import com.phuctam03.bookinghotel.model.BookingRoom;
import com.phuctam03.bookinghotel.model.Room;
import com.phuctam03.bookinghotel.repository.BookingRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingRoomService implements  IBookingRoomService{

    @Autowired
    private BookingRoomRepository bookingRoomRepository;

    @Autowired
    private  final  IRoomService roomService;

    public List<BookingRoom> getAllBookingsByRoomId(Long roomId) {
        return  bookingRoomRepository.findByRoomId(roomId);
    }


    @Override
    public List<BookingRoom> getAllBookings() {
        return bookingRoomRepository.findAll();
    }

    @Override
    public BookingRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRoomRepository.findBookingRoomByBookingConfirmationCode(confirmationCode).orElseThrow(() -> new ResourceNotFoundException("No Booking Found with  booking code : "+confirmationCode));
    }

    @Override
    public String saveBooking(Long roomId, BookingRoom bookingRequest) {
        // ham isBefore de kiem tra ngay ra phai lon hon ngay dat phong
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw  new InvalidBookingRequestException("check in date must come before check-out date");
        }

        Room room = roomService.getRoomById(roomId).get();
        List<BookingRoom> existingBooking = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest,existingBooking);
        if(roomIsAvailable){
            room.addBooking(bookingRequest);
            bookingRoomRepository.save(bookingRequest);
        }else {
            throw new InvalidBookingRequestException("Sorry,This room has been booked for the selected dates");
        }
        return  bookingRequest.getBookingConfirmationCode();

    }


    // ham nay kiem tra neu du viec dat phong trung voi cac phong da co trong danh sach bookingRoom thi se bi loai
    private boolean roomIsAvailable(BookingRoom bookingRequest, List<BookingRoom> existingBooking) {
        return existingBooking.stream()
                .noneMatch(existing->
                        bookingRequest.getCheckInDate().equals(existing.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existing.getCheckOutDate())

                                || (bookingRequest.getCheckInDate().isAfter(existing.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existing.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().isBefore(existing.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existing.getCheckOutDate()))


                                || (bookingRequest.getCheckInDate().isBefore(existing.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existing.getCheckOutDate()))



                                || (bookingRequest.getCheckInDate().equals(existing.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existing.getCheckInDate()))


                                || (bookingRequest.getCheckInDate().equals(existing.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRoomRepository.deleteById(bookingId);

    }

    @Override
    public List<BookingRoom> getBookingsByUserEmail(String email) {
        return bookingRoomRepository.findByGuestEmail(email);
    }
}
