package com.example.hotelbooking.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;

    private String userId;

    private String roomId;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private Integer totalNights;

    private BigDecimal totalPrice;

    private BookingStatus status;

    private LocalDateTime createdAt;
}