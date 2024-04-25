package com.phuctam03.bookinghotel.response;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;



@Data
public class BookingResponse {
    private  Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestName;
    private  String guestEmail;

    private int NumberOfAdults;

    private int NumberOfChildren;

    private int totalNumberOfGuest;



    private  String bookingConfirmationCode;

    private  RoomResponse room;


    public BookingResponse() {

    }

    public BookingResponse(Long id, LocalDate checkInDate,
                           LocalDate checkOutDate, String bookingConfirmationCode) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }

    public BookingResponse(Long id, LocalDate checkInDate,
                           LocalDate checkOutDate, String guestName,
                           String guestEmail, int numberOfAdults, int numberOfChildren, int totalNumberOfGuest,
                           String bookingConfirmationCode, RoomResponse room) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.guestName = guestName;
        this.guestEmail = guestEmail;
        NumberOfAdults = numberOfAdults;
        NumberOfChildren = numberOfChildren;
        this.totalNumberOfGuest = totalNumberOfGuest;
        this.bookingConfirmationCode = bookingConfirmationCode;
        this.room = room;
    }
}
