package com.example.wirtualneprzedszkole.mapper.message;

import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dao.message.Message;
import com.example.wirtualneprzedszkole.model.dao.message.UserMessage;
import com.example.wirtualneprzedszkole.model.dto.UserDto;
import com.example.wirtualneprzedszkole.model.dto.message.SendMessageDto;
import com.example.wirtualneprzedszkole.model.dto.message.UserReadMsg;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MessageMapperTest {

    @Test
    public void testSendMessageDtoMapToMessage() {
        SendMessageDto msgDto = SendMessageDto.builder()
                .id(1L)
                .author(User.builder().name("John").lastName("Doe").email("johndoe@email.com").build())
                .to(Arrays.asList("jane@email.com", "bob@email.com"))
                .subject("Test subject")
                .content("Test content")
                .build();
        Message message = MessageMapper.SendMessageDtoMapToMessage(msgDto);
        assertEquals(msgDto.getId(), message.getId());
        assertEquals(msgDto.getAuthor(), message.getAuthor());
        assertEquals(msgDto.getSubject(), message.getSubject());
        assertEquals(msgDto.getContent(), message.getContent());
    }

    @Test
    public void testUserMessagesMapToUsersDto() {
        User user1 = User.builder().id(1L).name("user1").build();
        User user2 = User.builder().id(2L).name("user2").build();

        UserMessage userMessage1 = new UserMessage(user1, Message.builder().content("message1").build(), true);
        UserMessage userMessage2 = new UserMessage(user2, Message.builder().content("message2").build(), true);
        List<UserMessage> userMessageList = Arrays.asList(userMessage1, userMessage2);

        List<UserDto> expectedUserDtoList = Arrays.asList(
                UserDto.builder().id(1L).name("user1").build(),
                UserDto.builder().id(2L).name("user2").build()
        );

        List<UserDto> actualUserDtoList = MessageMapper.userMessagesMapToUsersDto(userMessageList);

        assertEquals(expectedUserDtoList.size(), actualUserDtoList.size());
    }

    @Test
    public void testUserMessageMapToUserReadMsg() {
        User user = User.builder().name("John").lastName("Doe").email("johndoe@example.com").build();
        UserMessage userMessage = UserMessage.builder().user(user).isRead(true).build();

        UserReadMsg userReadMsg = MessageMapper.userMessageMapToUserReadMsg(userMessage);

        assertEquals("John", userReadMsg.getName());
        assertEquals("Doe", userReadMsg.getLastName());
        assertEquals("johndoe@example.com", userReadMsg.getEmail());
        assertEquals(true, userReadMsg.getIsRead());
    }


}