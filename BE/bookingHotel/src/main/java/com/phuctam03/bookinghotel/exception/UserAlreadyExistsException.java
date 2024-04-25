package com.phuctam03.bookinghotel.exception;

import java.sql.SQLException;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
