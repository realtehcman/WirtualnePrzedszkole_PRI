package com.example.wirtualneprzedszkole.validation;

import org.junit.jupiter.api.Test;

import javax.validation.ConstraintValidatorContext;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

class PhoneNumberConstraintValidatorTest {

    @Test
    public void testValidPhoneNumber() {
        PhoneNumberConstraintValidator validator = new PhoneNumberConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);

        boolean result = validator.isValid("123456789", context);

        assertTrue(result);
    }

    @Test
    public void testInvalidPhoneNumberTooShort() {
        PhoneNumberConstraintValidator validator = new PhoneNumberConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);

        boolean result = validator.isValid("12345678", context);

        assertFalse(result);
    }

    @Test
    public void testInvalidPhoneNumberTooLong() {
        PhoneNumberConstraintValidator validator = new PhoneNumberConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);

        boolean result = validator.isValid("1234567890", context);

        assertFalse(result);
    }

    @Test
    public void testInvalidPhoneNumberCharacters() {
        PhoneNumberConstraintValidator validator = new PhoneNumberConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);

        boolean result = validator.isValid("12a45678", context);

        assertFalse(result);
    }

    @Test
    public void testValidPhoneNumberWithLeadingZero() {
        PhoneNumberConstraintValidator validator = new PhoneNumberConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);

        boolean result = validator.isValid("012345678", context);

        assertTrue(result);
    }

    @Test
    public void testNullPhoneNumber() {
        PhoneNumberConstraintValidator validator = new PhoneNumberConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);

        boolean result = validator.isValid(null, context);

        assertTrue(result);
    }


}