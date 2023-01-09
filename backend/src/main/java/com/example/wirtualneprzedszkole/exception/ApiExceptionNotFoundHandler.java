package com.example.wirtualneprzedszkole.exception;

import com.example.wirtualneprzedszkole.model.dao.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionNotFoundHandler extends Throwable {
    @ExceptionHandler(value = {ApiRequestNotFoundException.class})
    public ResponseEntity<Object> handleApiRequestExceptionConflict(ApiRequestNotFoundException e) {
        HttpStatus conflict = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(
                e.getMessage(),
                e,
                conflict,
                ZonedDateTime.now(ZoneId.of("Z"))
        );
        return new ResponseEntity<>(apiException, conflict);
    }
}
