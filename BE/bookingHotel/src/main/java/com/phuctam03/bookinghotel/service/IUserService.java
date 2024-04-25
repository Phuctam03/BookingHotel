package com.phuctam03.bookinghotel.service;

import com.phuctam03.bookinghotel.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);

    List<User> getUsers();
    void deleteUser(String email);

    User getUser(String email);

}
