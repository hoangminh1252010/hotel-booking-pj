package com.example.hotelbooking.service;

import com.example.hotelbooking.dto.RoomRequest;
import com.example.hotelbooking.model.Room;
import com.example.hotelbooking.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.hotelbooking.model.Booking;
import com.example.hotelbooking.model.BookingStatus;
import com.example.hotelbooking.repository.BookingRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.time.LocalDate;
import java.util.ArrayList;
@Service
@RequiredArgsConstructor
public class RoomService {
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public List<Room> getAllActiveRooms() {
        return roomRepository.findByActiveTrue();
    }

    public Room getRoomById(String id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }
    public List<Room> searchAvailableRooms(
        String location,
        String checkInDate,
        String checkOutDate,
        Integer guests
) {
    List<Room> rooms;

    if (location == null || location.trim().isEmpty()) {
        rooms = roomRepository.findByActiveTrue();
    } else {
        rooms = roomRepository.findByLocationContainingIgnoreCaseAndActiveTrue(location);
    }

    List<Room> filteredRooms = new ArrayList<>();

    for (Room room : rooms) {
        boolean matchCapacity = guests == null || room.getCapacity() >= guests;

        boolean matchAvailability = true;

        if (checkInDate != null && !checkInDate.isBlank()
                && checkOutDate != null && !checkOutDate.isBlank()) {

            LocalDate checkIn = LocalDate.parse(checkInDate);
            LocalDate checkOut = LocalDate.parse(checkOutDate);

            matchAvailability = isRoomAvailable(
                    room.getId(),
                    checkIn,
                    checkOut
            );
        }

        if (matchCapacity && matchAvailability) {
            filteredRooms.add(room);
        }
    }

    return filteredRooms;
}
private boolean isRoomAvailable(
        String roomId,
        LocalDate checkIn,
        LocalDate checkOut
) {
    List<Booking> existingBookings =
            bookingRepository.findByRoomIdAndStatusNot(
                    roomId,
                    BookingStatus.CANCELLED
            );

    for (Booking booking : existingBookings) {
        boolean isOverlapping =
                checkIn.isBefore(booking.getCheckOutDate())
                        &&
                        checkOut.isAfter(booking.getCheckInDate());

        if (isOverlapping) {
            return false;
        }
    }

    return true;
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