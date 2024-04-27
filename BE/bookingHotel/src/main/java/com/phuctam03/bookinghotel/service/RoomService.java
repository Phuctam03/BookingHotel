package com.phuctam03.bookinghotel.service;

import com.phuctam03.bookinghotel.exception.InternalServcerException;
import com.phuctam03.bookinghotel.exception.ResourceNotFoundException;
import com.phuctam03.bookinghotel.model.Room;
import com.phuctam03.bookinghotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


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

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isEmpty()){
            throw new ResourceNotFoundException("sorry, Room not found");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if(photoBlob != null){
            return  photoBlob.getBytes(1,(int) photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteRoom(Long roomId) {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isPresent()){
             roomRepository.deleteById(roomId);
        }
    }

    @Override
    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
        Room room = roomRepository.findById(roomId).get();
        if(roomType != null){
            room.setRoomType(roomType);
        }
        if(roomPrice != null){
            room.setRoomPrice(roomPrice);
        }
        if(photoBytes != null && photoBytes.length > 0 ){
           try{
               Blob photoBlob = new SerialBlob(photoBytes);
               room.setPhoto(photoBlob);
           }catch (SQLException ex){
               throw new InternalServcerException("Error updating room");
           }
        }
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {

        return Optional.of(roomRepository.findById(roomId).get());
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {

        return roomRepository.findAvailableRoomsByDateAndType(checkInDate,checkOutDate,roomType);
    }
}
