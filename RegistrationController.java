package com.example.bita.zero.loop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.bita.zero.loop.Repository.RegistrationRepository;
import com.example.bita.zero.loop.model.Registration;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;

    @PostMapping("/registration")
    public ResponseEntity<String> register(@RequestBody Registration user) {
        try {
            Registration existingUser = registrationRepository.findByUsername(user.getUsername());
            if (existingUser != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
            }

            registrationRepository.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error during registration: " + e.getMessage());
        }
    }

    @PutMapping("/registration/{id}")
    public ResponseEntity<String> updateRegistration(@PathVariable Long id, @RequestBody Registration updatedUser) {
        Optional<Registration> userOptional = registrationRepository.findById(id);
        if (userOptional.isPresent()) {
            Registration user = userOptional.get();
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            registrationRepository.save(user);
            return ResponseEntity.status(HttpStatus.OK).body("User updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @DeleteMapping("/registration/{id}")
    public ResponseEntity<String> deleteRegistration(@PathVariable Long id) {
        try {
            registrationRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error during deletion: " + e.getMessage());
        }
    }

    @GetMapping("/registration")
    public ResponseEntity<List<Registration>> getAllRegistrations() {
        try {
            List<Registration> users = registrationRepository.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null);
        }
    }

    @GetMapping("/registration/{id}")
    public ResponseEntity<Registration> getRegistrationById(@PathVariable Long id) {
        Optional<Registration> userOptional = registrationRepository.findById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
