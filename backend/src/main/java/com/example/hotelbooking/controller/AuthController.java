package com.example.hotelbooking.controller;

import com.example.hotelbooking.dto.AuthResponse;
import com.example.hotelbooking.dto.LoginRequest;
import com.example.hotelbooking.dto.RegisterRequest;
import com.example.hotelbooking.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}