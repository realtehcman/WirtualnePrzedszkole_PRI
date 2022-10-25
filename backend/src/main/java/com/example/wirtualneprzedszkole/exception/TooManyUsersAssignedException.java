package com.example.wirtualneprzedszkole.exception;

public class TooManyUsersAssignedException extends RuntimeException {
    public TooManyUsersAssignedException(String message) {
        super(message);
    }
}
