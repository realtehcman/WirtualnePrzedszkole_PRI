package com.example.wirtualneprzedszkole.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class EmailSenderServiceImplTest {
    @Mock
    private JavaMailSender javaMailSender;

    @InjectMocks
    private EmailSenderServiceImpl emailSenderService;

    @Test
    void testSendEmail() {
        String to = "test@example.com";
        String subject = "Test Email";
        String text = "This is a test email.";

        emailSenderService.sendEmail(to, subject, text);

        ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(javaMailSender).send(captor.capture());
        SimpleMailMessage message = captor.getValue();

        assertEquals("wirtualne.przedszkole25@gmail.com", message.getFrom());
        assertEquals(to, message.getTo()[0]);
        assertEquals(subject, message.getSubject());
        assertEquals(text, message.getText());
    }
}
