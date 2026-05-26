package com.example.hotelbooking.controller;

import com.example.hotelbooking.dto.RoomRequest;
import com.example.hotelbooking.model.Room;
import com.example.hotelbooking.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/api/rooms")
    public List<Room> getRooms() {
        return roomService.getAllActiveRooms();
    }

    @GetMapping("/api/rooms/{id}")
    public Room getRoomById(@PathVariable String id) {
        return roomService.getRoomById(id);
    }

    @GetMapping("/api/rooms/search")
    public List<Room> searchRooms(
        @RequestParam(required = false) String location,
        @RequestParam(required = false) String checkInDate,
        @RequestParam(required = false) String checkOutDate,
        @RequestParam(required = false) Integer guests
    ) {
    return roomService.searchAvailableRooms(
            location,
            checkInDate,
            checkOutDate,
            guests
    );
    }

    @PostMapping("/api/admin/rooms")
    public Room createRoom(@RequestBody RoomRequest request) {
        return roomService.createRoom(request);
    }

    @PutMapping("/api/admin/rooms/{id}")
    public Room updateRoom(
            @PathVariable String id,
            @RequestBody RoomRequest request
    ) {
        return roomService.updateRoom(id, request);
    }

    @DeleteMapping("/api/admin/rooms/{id}")
    public String deleteRoom(@PathVariable String id) {
        roomService.deleteRoom(id);
        return "Room deleted successfully";
    }
}