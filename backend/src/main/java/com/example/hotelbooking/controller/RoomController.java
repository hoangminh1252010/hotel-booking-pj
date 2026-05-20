package com.example.hotelbooking.controller;

import com.example.hotelbooking.model.Room;
import com.example.hotelbooking.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomRepository roomRepository;

    @GetMapping
    public List<Room> getRooms() {
        return roomRepository.findByActiveTrue();
    }

    @PostMapping("/seed")
    public Room createRoom(@RequestBody Room room) {
        room.setActive(true);
        room.setCreatedAt(LocalDateTime.now());

        return roomRepository.save(room);
    }
}