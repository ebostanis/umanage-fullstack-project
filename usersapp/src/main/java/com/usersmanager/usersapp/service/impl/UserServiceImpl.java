package com.usersmanager.usersapp.service.impl;


import com.usersmanager.usersapp.model.Address;
import com.usersmanager.usersapp.model.User;
import com.usersmanager.usersapp.repositories.UserRepo;
import com.usersmanager.usersapp.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.Optional;

//The implementation of the User Service
@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;


    public UserServiceImpl(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    @Override
    public User saveUser(User user) {
        if (userRepo.existsByFirstNameAndLastNameAndBirthdate(user.getFirstName(), user.getLastName(), user.getBirthdate())) {//prevents the creation of duplicate users
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }
        if (user.getAddresses() != null) {//assign the addresses to the associated user
            for (Address address : user.getAddresses()) {
                address.setUser(user);
            }
        }
        return userRepo.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

    @Override
    public Page<User> findUsersWithPaginationAndSearch(Integer page, Integer size, String search) {//used for easier implementation of pagination on the frontend
        Pageable pageable = PageRequest.of(page, size);
        if (search != null && !search.isEmpty()) {
            return userRepo.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(search, search, pageable);
        }
        return userRepo.findAll(pageable);
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepo.findById(id);
    }

}
