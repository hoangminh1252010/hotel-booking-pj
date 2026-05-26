package com.example.hotelbooking.repository;

import com.example.hotelbooking.model.Booking;
import com.example.hotelbooking.model.BookingStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {

    List<Booking> findByUserId(String userId);

    List<Booking> findByRoomIdAndStatusNot(
            String roomId,
            BookingStatus status
    );
}