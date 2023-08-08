package org.project.back.oauth.repository;

import org.project.back.oauth.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findUserByEmailAndProvider(String email, String provider); 
}