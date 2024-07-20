package com.example.bita.zero.loop.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.bita.zero.loop.model.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    Registration findByUsername(String username);
    
}
