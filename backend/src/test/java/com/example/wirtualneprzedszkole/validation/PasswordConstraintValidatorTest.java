package com.example.wirtualneprzedszkole.validation;

import org.junit.jupiter.api.Test;

import javax.validation.ConstraintValidatorContext;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class PasswordConstraintValidatorTest {

    @Test
    public void testValidPassword() {
        PasswordConstraintValidator validator = new PasswordConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);
        when(context.buildConstraintViolationWithTemplate(anyString()))
                .thenReturn(mock(ConstraintValidatorContext.ConstraintViolationBuilder.class));

        boolean result = validator.isValid("ValidPassword1", context);

        assertTrue(result);
        verify(context, never()).disableDefaultConstraintViolation();
        verify(context, never()).buildConstraintViolationWithTemplate(anyString());
    }

    @Test
    public void testInvalidPasswordTooShort() {
        PasswordConstraintValidator validator = new PasswordConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);
        when(context.buildConstraintViolationWithTemplate(anyString()))
                .thenReturn(mock(ConstraintValidatorContext.ConstraintViolationBuilder.class));

        boolean result = validator.isValid("short", context);

        assertFalse(result);
        verify(context).disableDefaultConstraintViolation();
    }

    @Test
    public void testInvalidPasswordNoUpperCase() {
        PasswordConstraintValidator validator = new PasswordConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);
        when(context.buildConstraintViolationWithTemplate(anyString()))
                .thenReturn(mock(ConstraintValidatorContext.ConstraintViolationBuilder.class));

        boolean result = validator.isValid("nouppercase1", context);

        assertFalse(result);
        verify(context).disableDefaultConstraintViolation();
    }

    @Test
    public void testInvalidPasswordNoLowerCase() {
        PasswordConstraintValidator validator = new PasswordConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);
        when(context.buildConstraintViolationWithTemplate(anyString()))
                .thenReturn(mock(ConstraintValidatorContext.ConstraintViolationBuilder.class));

        boolean result = validator.isValid("NOLOWERCASE1", context);

        assertFalse(result);
        verify(context).disableDefaultConstraintViolation();
    }

    @Test
    public void testInvalidPasswordNoDigit() {
        PasswordConstraintValidator validator = new PasswordConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);
        when(context.buildConstraintViolationWithTemplate(anyString()))
                .thenReturn(mock(ConstraintValidatorContext.ConstraintViolationBuilder.class));

        boolean result = validator.isValid("NoDigitHere", context);

        assertFalse(result);
        verify(context).disableDefaultConstraintViolation();
    }

    @Test
    public void testInvalidPasswordTooLong() {
        PasswordConstraintValidator validator = new PasswordConstraintValidator();
        ConstraintValidatorContext context = mock(ConstraintValidatorContext.class);
        when(context.buildConstraintViolationWithTemplate(anyString()))
                .thenReturn(mock(ConstraintValidatorContext.ConstraintViolationBuilder.class));

        boolean result = validator.isValid("ThisPasswordIsTooLongToBeValid1ThisPasswordIsTooLongToBeValid1ThisPasswordIsTooLongToBeValid1ThisPasswordIsTooLongToBeValid1", context);

        assertFalse(result);
    }

}