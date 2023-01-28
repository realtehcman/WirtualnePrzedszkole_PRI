package com.example.wirtualneprzedszkole.repository.message;

import com.example.wirtualneprzedszkole.model.dao.message.Message;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class MessageRepoTest {

    @Autowired
    private MessageRepo messageRepository;

    @Test
    void testSaveMessage() {
        Message message = Message.builder().subject("Test Subject").content("Test Content").build();
        messageRepository.save(message);
        assertNotNull(messageRepository.findById(message.getId()));
    }

    @Test
    void testFindAllMessages() {
        Message message1 = Message.builder().subject("Test Subject 1").content("Test Content 1").build();
        messageRepository.save(message1);
        Message message2 = Message.builder().subject("Test Subject 2").content("Test Content 2").build();
        messageRepository.save(message2);
        assertEquals(2, messageRepository.findAll().size());
    }

    @Test
    void testDeleteMessage() {
        Message message = Message.builder().subject("Test Subject").content("Test Content").build();
        messageRepository.save(message);
        messageRepository.delete(message);
        assertFalse(messageRepository.findById(message.getId()).isPresent());
    }

}