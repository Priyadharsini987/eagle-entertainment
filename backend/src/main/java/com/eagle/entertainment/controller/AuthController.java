package com.eagle.entertainment.controller;

import com.eagle.entertainment.config.JwtUtil;
import com.eagle.entertainment.model.User;
import com.eagle.entertainment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserDetailsService userDetailsService;
    @Autowired private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            System.out.println("DEBUG: Attempting login for user: " + request.getUsername());
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            System.out.println("DEBUG: Login successful for user: " + request.getUsername());
        } catch (BadCredentialsException e) {
            System.out.println("DEBUG: Login failed - Bad Credentials for: " + request.getUsername());
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        } catch (Exception e) {
            System.out.println("DEBUG: Unexpected login error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error during login"));
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        final String token = jwtUtil.generateToken(userDetails);

        Optional<User> user = userRepository.findByUsername(request.getUsername());
        return ResponseEntity.ok(Map.of(
            "token", token,
            "username", request.getUsername(),
            "role", user.map(User::getRole).orElse("USER"),
            "email", user.map(User::getEmail).orElse("")
        ));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("valid", false));
        }
        String token = authHeader.substring(7);
        try {
            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            boolean valid = jwtUtil.validateToken(token, userDetails);
            if (valid) {
                Optional<User> user = userRepository.findByUsername(username);
                return ResponseEntity.ok(Map.of(
                    "valid", true,
                    "username", username,
                    "role", user.map(User::getRole).orElse("USER")
                ));
            }
        } catch (Exception e) {
            // fall through
        }
        return ResponseEntity.status(401).body(Map.of("valid", false));
    }

    static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
