package com.phuctam03.bookinghotel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import java.time.LocalDate;


@Entity
public class BookingRoom {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(name = "check_in")
    private LocalDate checkInDate;
    @Column(name = "check_out")
    private LocalDate checkOutDate;


    @Column(name = "guest_name")
    private String guestName;
    @Column(name = "guest_email")
    private String guestEmail;

    @Column(name = "adults")
    private int NumberOfAdults;
    @Column(name = "children")
    private int NumberOfChildren;
    @Column(name = "total_guest")
    private int totalNumberOfGuest;


    @Column(name = "confirmation_code")
    private  String bookingConfirmationCode;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;





    public BookingRoom(){}

    public int calculateToNumBerOfGuest(){
        return  this.NumberOfAdults + this.NumberOfChildren;
    }

    public  BookingRoom(String bookingConfirmationCode){
        this.bookingConfirmationCode = bookingConfirmationCode;
    }



    public BookingRoom(Long id, LocalDate checkInDate, LocalDate checkOutDate, String guestName, String guestEmail, int numberOfAdults, int numberOfChildren, int totalNumberOfGuest, String bookingConfirmationCode, Room room) {
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getGuestEmail() {
        return guestEmail;
    }

    public void setGuestEmail(String guestEmail) {
        this.guestEmail = guestEmail;
    }

    public int getNumberOfAdults() {
        return NumberOfAdults;
    }

    public void setNumberOfAdults(int numberOfAdults) {
        NumberOfAdults = numberOfAdults;
        calculateToNumBerOfGuest();
    }

    public int getNumberOfChildren() {
        return NumberOfChildren;
    }

    public void setNumberOfChildren(int numberOfChildren) {
        NumberOfChildren = numberOfChildren;
        calculateToNumBerOfGuest();
    }

    public int getTotalNumberOfGuest() {
        return totalNumberOfGuest;
    }

    public void setTotalNumberOfGuest(int totalNumberOfGuest) {
        this.totalNumberOfGuest = totalNumberOfGuest;
    }

    public String getBookingConfirmationCode() {
        return bookingConfirmationCode;
    }

    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}
