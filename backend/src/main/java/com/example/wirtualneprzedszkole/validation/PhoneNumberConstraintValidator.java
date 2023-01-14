package com.example.wirtualneprzedszkole.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PhoneNumberConstraintValidator implements ConstraintValidator<ValidPhoneNumber, String> {

    @Override
    public void initialize(ValidPhoneNumber validPhoneNumber) {

    }

    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext context) {
        if (phoneNumber != null) {
            return phoneNumber.matches("^\\d{9}$")
                    && (phoneNumber.length() == 9);
        }

        else {
            return true;
        }

    }
}
