package com.example.wirtualneprzedszkole.service;

public interface EmailSenderService {
    void sendEmail(String to, String subject, String text);
    void sendMultipleMail(String[] to, String subject, String text);
}
