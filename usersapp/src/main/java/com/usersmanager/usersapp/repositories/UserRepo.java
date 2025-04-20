package com.usersmanager.usersapp.repositories;

import com.usersmanager.usersapp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    boolean existsByFirstNameAndLastNameAndBirthdate(String firstName, String LastName, Date birthdate);
    Page<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName, Pageable pageable);
}
