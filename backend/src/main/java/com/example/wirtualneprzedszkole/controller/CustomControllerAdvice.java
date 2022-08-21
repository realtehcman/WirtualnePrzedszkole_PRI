package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.exception.UserAlreadyExistException;
import com.example.wirtualneprzedszkole.model.dto.ErrorResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
//@CrossOrigin(origins = "http://localhost:3000/")
@RestControllerAdvice
public class CustomControllerAdvice {
    @ExceptionHandler(UserAlreadyExistException.class)
    ErrorResponse handleUserAlreadyExistException (UserAlreadyExistException uaee) {
        return new ErrorResponse("User '" + uaee.getMessage() + "' already exist");
    }
}
