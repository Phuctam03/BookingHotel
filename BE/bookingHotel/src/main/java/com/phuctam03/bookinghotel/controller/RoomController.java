package com.phuctam03.bookinghotel.controller;

import com.phuctam03.bookinghotel.model.Room;
import com.phuctam03.bookinghotel.response.RoomResponse;
import com.phuctam03.bookinghotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private  final IRoomService roomService;



    @PostMapping("/add/new-room")
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
}
