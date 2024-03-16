package com.phuctam03.bookinghotel.service;

import com.phuctam03.bookinghotel.model.Room;
import com.phuctam03.bookinghotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;


@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService{
    private final RoomRepository roomRepository;


    @Override
    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws SQLException, IOException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if(!photo.isEmpty()){
            byte[] file = photo.getBytes();
            Blob photoBlob = new SerialBlob(file);
            room.setPhoto(photoBlob);
        }

        return  roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return  roomRepository.findDistinctRoomTypes();
    }
}
