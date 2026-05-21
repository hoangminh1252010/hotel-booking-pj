package com.example.hotelbooking.service;

import com.example.hotelbooking.dto.RoomRequest;
import com.example.hotelbooking.model.Room;
import com.example.hotelbooking.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public List<Room> getAllActiveRooms() {
        return roomRepository.findByActiveTrue();
    }

    public Room getRoomById(String id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public List<Room> searchRoomsByLocation(String location) {
        if (location == null || location.trim().isEmpty()) {
            return roomRepository.findByActiveTrue();
        }

        return roomRepository.findByLocationContainingIgnoreCaseAndActiveTrue(location);
    }

    public Room createRoom(RoomRequest request) {
        Room room = Room.builder()
                .name(request.getName())
                .description(request.getDescription())
                .location(request.getLocation())
                .pricePerNight(request.getPricePerNight())
                .capacity(request.getCapacity())
                .bedCount(request.getBedCount())
                .imageUrls(request.getImageUrls())
                .amenities(request.getAmenities())
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        return roomRepository.save(room);
    }

    public Room updateRoom(String id, RoomRequest request) {
        Room room = getRoomById(id);

        room.setName(request.getName());
        room.setDescription(request.getDescription());
        room.setLocation(request.getLocation());
        room.setPricePerNight(request.getPricePerNight());
        room.setCapacity(request.getCapacity());
        room.setBedCount(request.getBedCount());
        room.setImageUrls(request.getImageUrls());
        room.setAmenities(request.getAmenities());

        return roomRepository.save(room);
    }

    public void deleteRoom(String id) {
        Room room = getRoomById(id);

        room.setActive(false);

        roomRepository.save(room);
    }
}