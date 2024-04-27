package com.phuctam03.bookinghotel.controller;

import com.phuctam03.bookinghotel.exception.PhotoRetrievalException;
import com.phuctam03.bookinghotel.exception.ResourceNotFoundException;
import com.phuctam03.bookinghotel.model.BookingRoom;
import com.phuctam03.bookinghotel.model.Room;
import com.phuctam03.bookinghotel.response.RoomResponse;
import com.phuctam03.bookinghotel.service.BookingRoomService;
import com.phuctam03.bookinghotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {
    private  final IRoomService roomService;
    private  final BookingRoomService bookingRoomService;



    @RequestMapping(value = "/add/new-room",
            method = RequestMethod.POST ,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        Room savedRoom = roomService.addNewRoom(photo,roomType,roomPrice);
        RoomResponse response = new RoomResponse(savedRoom.getId(),
                savedRoom.getRoomType(),savedRoom.getRoomPrice());
        return  ResponseEntity.ok(response);

    }
    @GetMapping("/room/types")
   public List<String> getAllRoomTypes(){
        return  roomService.getAllRoomTypes();
    }


    @GetMapping("/list/room")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();

        for ( Room room : rooms ) {
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            if(photoBytes != null && photoBytes.length > 0){
                String Base64Photo = Base64.encodeBase64String(photoBytes);
                RoomResponse roomResponse = getRoomRespone(room);
                roomResponse.setPhoto(Base64Photo);
                roomResponses.add(roomResponse);
            }
        }
        return ResponseEntity.ok(roomResponses);

    }


    @DeleteMapping("/delete/room/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
      public  ResponseEntity<Void> deleteRoom(@PathVariable("id") Long roomId){
          roomService.deleteRoom(roomId);
          return  new ResponseEntity<>(HttpStatus.NO_CONTENT);

      }


      @PutMapping("/update/{id}")
      @PreAuthorize("hasRole('ROLE_ADMIN')")
      public  ResponseEntity<RoomResponse> updateRoom(@PathVariable("id") Long roomId,
                                                   @RequestParam(required = false)   String roomType,
                                                   @RequestParam(required = false)    BigDecimal roomPrice,
                                                   @RequestParam(required = false)   MultipartFile photo) throws IOException, SQLException {

        byte[] photoBytes = photo != null && !photo.isEmpty() ? photo.getBytes() : roomService.getRoomPhotoByRoomId(roomId);
        Blob photoBlob = photoBytes != null && photoBytes.length > 0 ? new SerialBlob(photoBytes) : null;
        Room theRoom = roomService.updateRoom(roomId,roomType,roomPrice,photoBytes);
        theRoom.setPhoto(photoBlob);
        RoomResponse roomResponse = getRoomRespone(theRoom);
        return ResponseEntity.ok(roomResponse);
      }




      @GetMapping("room/{id}")
      public  ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable("id") Long roomId){
        Optional<Room> theRoom = roomService.getRoomById(roomId);

          return  theRoom.map(room -> {
              RoomResponse roomResponse = getRoomRespone(room);
              return  ResponseEntity.ok(Optional.of(roomResponse));
          }).orElseThrow(() -> new ResourceNotFoundException("Room not found"));

      }




      @GetMapping("/available-rooms")
      public  ResponseEntity<List<RoomResponse>> getAvailableRooms(
              @RequestParam("checkInDate")@DateTimeFormat(iso = DateTimeFormat.ISO.DATE ) LocalDate checkInDate,
              @RequestParam("checkOutDate")@DateTimeFormat(iso = DateTimeFormat.ISO.DATE ) LocalDate checkOutDate,
              @RequestParam("roomType") String roomType
              ) throws SQLException {
        List<Room> availableRooms = roomService.getAvailableRooms(checkInDate,checkOutDate,roomType);
        List<RoomResponse> roomResponses = new ArrayList<>();
          for (Room room : availableRooms) {
              byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
              if(photoBytes != null && photoBytes.length > 0 ){
                  String photoBase64 = Base64.encodeBase64String(photoBytes);
                  RoomResponse roomResponse = getRoomRespone(room);
                  roomResponse.setPhoto(photoBase64);
                  roomResponses.add(roomResponse);
              }
          }
          if(roomResponses.isEmpty()){
              return  ResponseEntity.noContent().build();
          }else {
              return  ResponseEntity.ok(roomResponses);
          }
      }


    private RoomResponse getRoomRespone(Room room) {
        List<BookingRoom> bookings = getAllBookingsByRoomId(room.getId());
//        List<BookingResponse> bookingResponses =
//                bookings
//                        .stream()
//                        .map(booking -> new BookingResponse(
//                                booking.getId(),
//                                booking.getCheckInDate(),
//                                booking.getCheckOutDate(),booking.getBookingConfirmationCode())).toList();

        byte[] photoBytes = null;
        Blob photoBlob  = room.getPhoto();
        if(photoBlob != null){
            try{
                photoBytes = photoBlob.getBytes(1,(int) photoBlob.length());
            }catch (SQLException e ){
                throw new PhotoRetrievalException("Error retrieving Photo");
            }
        }
        return  new RoomResponse(room.getId(),
        room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),photoBytes);
    }

    private List<BookingRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRoomService.getAllBookingsByRoomId(roomId);

    }
}
