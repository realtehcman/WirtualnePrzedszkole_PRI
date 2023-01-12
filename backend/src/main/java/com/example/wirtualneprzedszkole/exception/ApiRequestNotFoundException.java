package com.example.wirtualneprzedszkole.exception;


public class ApiRequestNotFoundException extends RuntimeException {
    public ApiRequestNotFoundException(String message) {
        super(message);
    }
    public ApiRequestNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
