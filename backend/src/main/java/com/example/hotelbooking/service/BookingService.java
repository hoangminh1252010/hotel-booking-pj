package com.example.hotelbooking.service;

import com.example.hotelbooking.dto.BookingRequest;
import com.example.hotelbooking.model.*;
import com.example.hotelbooking.repository.BookingRepository;
import com.example.hotelbooking.repository.RoomRepository;
import com.example.hotelbooking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public Booking createBooking(BookingRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        validateBookingDates(request);

        validateRoomAvailability(
                room.getId(),
                request.getCheckInDate(),
                request.getCheckOutDate()
        );

        long totalNights = ChronoUnit.DAYS.between(
                request.getCheckInDate(),
                request.getCheckOutDate()
        );

        BigDecimal totalPrice = room.getPricePerNight()
                .multiply(BigDecimal.valueOf(totalNights));

        Booking booking = Booking.builder()
                .userId(user.getId())
                .roomId(room.getId())
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .totalNights((int) totalNights)
                .totalPrice(totalPrice)
                .status(BookingStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking cancelBooking(String bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELLED);

        return bookingRepository.save(booking);
    }

    private void validateBookingDates(BookingRequest request) {

        if (request.getCheckInDate() == null ||
                request.getCheckOutDate() == null) {
            throw new RuntimeException("Check-in/check-out required");
        }

        if (!request.getCheckOutDate()
                .isAfter(request.getCheckInDate())) {

            throw new RuntimeException(
                    "Check-out date must be after check-in date"
            );
        }
    }
    public List<Booking> getAllBookings() {
    return bookingRepository.findAll();
}

public Booking updateBookingStatus(String bookingId, BookingStatus status) {
    Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

    booking.setStatus(status);

    return bookingRepository.save(booking);
}
    private void validateRoomAvailability(
            String roomId,
            java.time.LocalDate checkIn,
            java.time.LocalDate checkOut
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
                throw new RuntimeException(
                        "Room is already booked for selected dates"
                );
            }
        }
    }
}