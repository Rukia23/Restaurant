package com.example.bita.zero.loop.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bita.zero.loop.Repository.ReservationRepository;
import com.example.bita.zero.loop.model.Reservation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ReservationController {

    private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);

    @Autowired
    private ReservationRepository reservationRepository;

    /**
     * 
     *
     * @return 
     */
    @GetMapping("/reservations")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    /**
     * 
     *
     * @param reservation 
     * @return a success 
     */
    @PostMapping("/reservations")
    public ResponseEntity<String> createReservation(@RequestBody Reservation reservation) {
        try {
            Reservation newReservation = reservationRepository.save(reservation);
            logger.info("Reservation created: {}", newReservation);
            return new ResponseEntity<>("Reservation created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error creating reservation", e);
            return new ResponseEntity<>("Error creating reservation: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 
     *
     * @param id 
     * @return 
     */
    @GetMapping("/reservations/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isPresent()) {
            return new ResponseEntity<>(reservation.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 
     *
     * @param id 
     * @param reservationDetails 
     * @return 
     */
    @PutMapping("/reservations/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody Reservation reservationDetails) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
            Reservation existingReservation = optionalReservation.get();
            existingReservation.setFullName(reservationDetails.getFullName());
            existingReservation.setEmail(reservationDetails.getEmail());
            existingReservation.setPhoneNumber(reservationDetails.getPhoneNumber());
            existingReservation.setReservationDate(reservationDetails.getReservationDate());
            existingReservation.setReservationTime(reservationDetails.getReservationTime());
            existingReservation.setNumberOfGuests(reservationDetails.getNumberOfGuests());
            existingReservation.setSpecialRequests(reservationDetails.getSpecialRequests());
            Reservation updatedReservation = reservationRepository.save(existingReservation);
            return new ResponseEntity<>(updatedReservation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 
     *
     * @param id 
     * @return 
     */
    @DeleteMapping("/reservations/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {
        if (reservationRepository.existsById(id)) {
            reservationRepository.deleteById(id);
            return new ResponseEntity<>("Reservation deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Reservation not found", HttpStatus.NOT_FOUND);
        }
    }
}
