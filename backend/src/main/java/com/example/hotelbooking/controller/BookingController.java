package com.example.hotelbooking.controller;

import com.example.hotelbooking.dto.BookingRequest;
import com.example.hotelbooking.model.Booking;
import com.example.hotelbooking.model.BookingStatus;
import com.example.hotelbooking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public Booking createBooking(
            @RequestBody BookingRequest request
    ) {
        return bookingService.createBooking(request);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(
            @PathVariable String userId
    ) {
        return bookingService.getUserBookings(userId);
    }

    @PutMapping("/{bookingId}/cancel")
    public Booking cancelBooking(
            @PathVariable String bookingId
    ) {
        return bookingService.cancelBooking(bookingId);
    }
    @GetMapping("/admin/all")
    public List<Booking> getAllBookings() {
    return bookingService.getAllBookings();
    }

    @PutMapping("/admin/{bookingId}/status")
    public Booking updateBookingStatus(
        @PathVariable String bookingId,
        @RequestParam BookingStatus status
    ) {
    return bookingService.updateBookingStatus(bookingId, status);   
    }
}