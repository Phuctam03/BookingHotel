package com.phuctam03.bookinghotel.repository;

import com.phuctam03.bookinghotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room,Long> {


    @Query("SELECT DISTINCT r.roomType FROM  Room r")
    List<String> findDistinctRoomTypes();


     @Query(value = "SELECT r FROM Room r WHERE r.roomType LIKE  %:roomType% AND r.id " +
             "NOT IN (select br.room.id FROM  BookingRoom br" +
             " WHERE ((br.checkInDate <= :checkOutDate) " +
             "AND " +
             "(br.checkOutDate >= :checkInDate)))")
    List<Room> findAvailableRoomsByDateAndType( LocalDate checkInDate, LocalDate checkOutDate, String roomType);
}
