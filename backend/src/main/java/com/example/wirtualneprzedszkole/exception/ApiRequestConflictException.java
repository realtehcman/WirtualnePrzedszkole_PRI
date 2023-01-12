package com.example.wirtualneprzedszkole.exception;

public class ApiRequestConflictException extends RuntimeException {
    public ApiRequestConflictException(String message) {
        super(message);
    }

    public ApiRequestConflictException(String message, Throwable cause) {
        super(message, cause);
    }
}
