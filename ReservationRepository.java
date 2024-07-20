package com.example.bita.zero.loop.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bita.zero.loop.model.Reservation;

@Repository
public interface ReservationRepository  extends JpaRepository<Reservation,Long>{

}
