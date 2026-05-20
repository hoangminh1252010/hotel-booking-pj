package com.example.hotelbooking.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "rooms")
public class Room {

    @Id
    private String id;

    private String name;
    private String description;
    private String location;

    private BigDecimal pricePerNight;

    private Integer capacity;
    private Integer bedCount;

    private List<String> imageUrls;
    private List<String> amenities;

    private Boolean active;
    private LocalDateTime createdAt;
}