package com.example.hotelbooking.repository;

import com.example.hotelbooking.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RoomRepository extends MongoRepository<Room, String> {

    List<Room> findByActiveTrue();

    List<Room> findByLocationContainingIgnoreCaseAndActiveTrue(String location);
}