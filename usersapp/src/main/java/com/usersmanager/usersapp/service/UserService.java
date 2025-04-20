package com.usersmanager.usersapp.service;

import com.usersmanager.usersapp.model.User;
import org.springframework.data.domain.Page;

import java.util.Optional;

//The interface of the User Service
public interface UserService {

    User saveUser(User user);

    void deleteUser(Long id);

    Page<User> findUsersWithPaginationAndSearch(Integer page, Integer size, String search);

    Optional<User> findUserById(Long id);

}
