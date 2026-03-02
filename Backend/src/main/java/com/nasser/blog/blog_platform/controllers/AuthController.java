package com.nasser.blog.blog_platform.controllers;

import com.nasser.blog.blog_platform.domain.dtos.AuthResponse;
import com.nasser.blog.blog_platform.domain.dtos.LoginRequest;
import com.nasser.blog.blog_platform.domain.dtos.RegisterRequest;
import com.nasser.blog.blog_platform.domain.entities.User;
import com.nasser.blog.blog_platform.repositories.UserRepository;
import com.nasser.blog.blog_platform.security.BlogUserDetails;
import com.nasser.blog.blog_platform.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        UserDetails userDetails = authenticationService.authenticate(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
        String token = authenticationService.generateToken(userDetails);
        User user = userRepository.findByEmail(loginRequest.getEmail()).get();
        AuthResponse authResponse = AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .expiresIn(86400)
                .build();

        return ResponseEntity.ok(authResponse);
    }


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {

        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode( registerRequest.getPassword()))
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .build();
        User registerUser = authenticationService.register(user);

        UserDetails userDetails = new BlogUserDetails(registerUser);
        String token = authenticationService.generateToken(userDetails);

        AuthResponse authResponse = AuthResponse.builder()
                .token(token)
                .expiresIn(86400)
                .userId(registerUser.getId())
                .build();

        return ResponseEntity.ok(authResponse);
    }
}
