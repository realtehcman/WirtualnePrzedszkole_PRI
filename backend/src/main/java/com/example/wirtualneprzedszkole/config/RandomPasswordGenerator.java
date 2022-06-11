package com.example.wirtualneprzedszkole.config;

import org.passay.*;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class RandomPasswordGenerator {

    public static final String ALLOWED_SPL_CHARS= "!@#$%^&*()_+";

    public static final String ERROR_CODE = "ERROR_SPECIAL_CHARS";

    public String generatePassayPassword() {
        PasswordGenerator passwordGenerator = new PasswordGenerator();
        CharacterData lowerCaseChars = PolishCharacterData.LowerCase;
        CharacterRule lowerCaseRule = new CharacterRule(lowerCaseChars);
        lowerCaseRule.setNumberOfCharacters(2);

        CharacterData upperCaseChars = PolishCharacterData.UpperCase;
        CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
        upperCaseRule.setNumberOfCharacters(2);

        CharacterData digit = EnglishCharacterData.Digit;
        CharacterRule digitRule = new CharacterRule(digit);
        digitRule.setNumberOfCharacters(2);

        CharacterData specialChars = new CharacterData() {
            @Override
            public String getErrorCode() {
                return ERROR_CODE;
            }

            @Override
            public String getCharacters() {
                return ALLOWED_SPL_CHARS;
            }
        };

        CharacterRule specialCharsRule = new CharacterRule(specialChars);
        specialCharsRule.setNumberOfCharacters(2);

        return passwordGenerator.generatePassword(10, lowerCaseRule, upperCaseRule,
                digitRule, specialCharsRule);
    }
}
