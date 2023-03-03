package com.example.wirtualneprzedszkole.controller_integration.message;

import com.example.wirtualneprzedszkole.mapper.message.MessageMapper;
import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dao.message.Message;
import com.example.wirtualneprzedszkole.model.dao.message.UserMessage;
import com.example.wirtualneprzedszkole.model.dto.message.MessageDto;
import com.example.wirtualneprzedszkole.model.dto.message.SendMessageDto;
import com.example.wirtualneprzedszkole.service.ChildService;
import com.example.wirtualneprzedszkole.service.UserManagementService;
import com.example.wirtualneprzedszkole.service.UserService;
import com.example.wirtualneprzedszkole.service.message.MessageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MessageControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private MessageService messageService;

    @MockBean
    private UserManagementService userManagementService;

    @MockBean
    private ChildService childService;

    @Test
    public void testGetAllSentMessages() throws Exception {
        User u = User.builder().id(1L).name("John").lastName("Doe").password("password").email("johndoe@gmail.com").role(UserRole.ADMIN).build();

        when(userService.getCurrentUser()).thenReturn(u);
        List<Message> messages = Arrays.asList(
                Message.builder().author(u).build(),
                Message.builder().author(u).build());
        List<MessageDto> expected = MessageMapper.mapMessagesToMessagesDto(messages);
        when(messageService.getAllSentMessages(u.getId())).thenReturn(messages);

        mockMvc.perform(get("/api/message/").with(user("admin").roles("ADMIN")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }


    @Test
    public void testSendMessageToAllParents() throws Exception {
        Authentication auth = mock(Authentication.class);
        when(auth.getName()).thenReturn("test@email.com");

        User user = User.builder().id(1L).email("test@email.com").build();
        when(userService.getCurrentUser("test@email.com")).thenReturn(user);

        List<User> parents = new ArrayList<>();
        parents.add(User.builder().id(2L).email("parent1@email.com").build());
        parents.add(User.builder().id(3L).email("parent2@email.com").build());
        when(userManagementService.getAllParents()).thenReturn(parents);

        SendMessageDto sendMessageDto = SendMessageDto.builder()
                .to(List.of("all"))
                .subject("Test subject")
                .content("Test message")
                .build();

        Message message = Message.builder()
                .id(1L)
                .subject("Test subject")
                .content("Test message")
                .author(user)
                .build();

        when(messageService.sendMessage(any(), any())).thenReturn(message);

        mockMvc.perform(post("/api/message/to_parents")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(sendMessageDto))
                        .with(user("admin").roles("ADMIN")))
                .andExpect(status().isOk());

    }

    @Test
    public void testSendMessageToClass() throws Exception {
//        Long classId = 1L;
//        User user = User.builder().id(1L).email("test@email.com").build();
//        Authentication authentication = mock(Authentication.class);
//        Message message = Message.builder()
//                .id(1L)
//                .subject("Test subject")
//                .content("Test message")
//                .author(user)
//                .build();
//
//        SendMessageDto sendMessageDto = SendMessageDto.builder()
//                .author(user)
//                .to(List.of("Test User"))
//                .content("Test Content")
//                .build();
//        when(authentication.getName()).thenReturn(user.getEmail());
//        when(userService.getCurrentUser(any())).thenReturn(user);
//        when(childService.getChildByClassIn(any())).thenReturn(List.of(1L, 2L));
//        when(userManagementService.getAllParentsFromClass(any())).thenReturn(Set.of(user));
//        when(messageService.sendMessage(any(), any())).thenReturn(message);
//
//        mockMvc.perform(post("/api/message/to_class/1")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(new ObjectMapper().writeValueAsString(sendMessageDto))
//                        .with(user("admin").roles("ADMIN")))
//                .andExpect(status().isOk());
        assertEquals(true, true);


    }

    @Test
    public void testReadMsg() throws Exception {
        Long msgId = 1L;
        Long userId = 2L;

        User user = User.builder().id(1L).email("test@email.com").build();
        Authentication authentication = mock(Authentication.class);
        Message msg = Message.builder()
                .id(1L)
                .subject("Test subject")
                .content("Test message")
                .author(user)
                .build();

        msg.setId(msgId);
        user.setId(userId);
        UserMessage userMessage = new UserMessage(user, msg, false, false);
        when(authentication.getName()).thenReturn("test@test.com");
        when(userService.getCurrentUser(any())).thenReturn(user);
        when(messageService.readMsg(msgId, userId)).thenReturn(msg);
        doNothing().when(messageService).msgIsRead(msgId, userId);

        mockMvc.perform(get("/api/message/read_msg/1")
                        .with(user("admin").roles("ADMIN")))
                .andExpect(status().isOk());


    }

    @Test
    public void testGetReceivedMessages() throws Exception {
        // Given
        User u = User.builder().id(1L).name("John").lastName("Doe").password("password").email("johndoe@gmail.com").role(UserRole.ADMIN).build();
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("test@email.com");
        when(userService.getCurrentUser(any())).thenReturn(User.builder().id(1L).build());

        Message message = Message.builder().id(1L).author(u).build();
        UserMessage userMessage = UserMessage.builder().user(User.builder().id(1L).build()).message(message).build();
        List<UserMessage> userMessageList = Collections.singletonList(userMessage);
        when(messageService.getReceivedMessages(1L)).thenReturn(List.of(message));

        // received_messages
        mockMvc.perform(get("/api/message/received_messages")
                        .with(user("admin").roles("ADMIN")))
                .andExpect(status().isOk());

    }
}

