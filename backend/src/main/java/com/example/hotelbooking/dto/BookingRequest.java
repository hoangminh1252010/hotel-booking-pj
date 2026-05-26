package com.example.hotelbooking.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookingRequest {

    private String userId;

    private String roomId;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;
}