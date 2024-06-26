package com.phuctam03.bookinghotel.repository;

import com.phuctam03.bookinghotel.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);

    List<User> findAllByEmail(String email);

    void deleteByEmail(String email);
    Optional<User> findByEmail(String email);
}
