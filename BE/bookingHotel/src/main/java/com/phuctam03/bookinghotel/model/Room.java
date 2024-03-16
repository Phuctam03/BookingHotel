package com.phuctam03.bookinghotel.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.RandomAccess;


@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private  String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked ;

    @Lob
    private Blob photo; // kieu du lieu dung de luu anh va cac video voi he nhi phan lon


    @OneToMany(mappedBy = "room",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<BookingRoom> bookings;


    public Room(){
        this.bookings = new ArrayList<>();
    }

    public Room(Long id, String roomType, BigDecimal roomPrice, boolean isBooked, List<BookingRoom> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.bookings = bookings;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public BigDecimal getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(BigDecimal roomPrice) {
        this.roomPrice = roomPrice;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean booked) {
        isBooked = booked;
    }

    public List<BookingRoom> getBookings() {
        return bookings;
    }

    public void setBookings(List<BookingRoom> bookings) {
        this.bookings = bookings;
    }


    public Blob getPhoto() {
        return photo;
    }

    public void setPhoto(Blob photo) {
        this.photo = photo;
    }

    public  static  String randomNumberString(int length){
        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder(length);
        for (int i = 0 ; i < length; i++){
            stringBuilder.append(random.nextInt(10));
        }
        return  stringBuilder.toString();
    }

    public  void addBooking(BookingRoom bookingRoom){
        if(bookings == null){
            bookings = new ArrayList<>();
        }
        bookings.add(bookingRoom);
        bookingRoom.setRoom(this);
        isBooked = true;
        String bookingCode =  randomNumberString(10);
        bookingRoom.setBookingConfirmationCode(bookingCode);
    }


}
