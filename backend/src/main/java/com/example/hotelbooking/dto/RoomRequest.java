package com.example.hotelbooking.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class RoomRequest {

    private String name;

    private String description;

    private String location;

    private BigDecimal pricePerNight;

    private Integer capacity;

    private Integer bedCount;

    private List<String> imageUrls;

    private List<String> amenities;
}