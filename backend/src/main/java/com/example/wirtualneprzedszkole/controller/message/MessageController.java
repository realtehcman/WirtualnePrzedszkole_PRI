package com.example.wirtualneprzedszkole.controller.message;

import com.example.wirtualneprzedszkole.mapper.message.MessageMapper;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dao.message.Message;
import com.example.wirtualneprzedszkole.model.dao.message.UserMessage;
import com.example.wirtualneprzedszkole.model.dto.message.MessageDto;
import com.example.wirtualneprzedszkole.model.dto.message.MessageDtoWithFieldIsRead;
import com.example.wirtualneprzedszkole.model.dto.message.SendMessageDto;
import com.example.wirtualneprzedszkole.service.ChildService;
import com.example.wirtualneprzedszkole.service.UserManagementService;
import com.example.wirtualneprzedszkole.service.UserService;
import com.example.wirtualneprzedszkole.service.message.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/message/")
public class MessageController {
    private final UserService userService;
    private final MessageService messageService;
    private final UserManagementService userManagementService;
    private final ChildService childService;

    @GetMapping
    public List<MessageDto> getAllSentMessages() {
        return MessageMapper.mapMessagesToMessagesDto(messageService.getAllSentMessages());
    }

    @PostMapping
    public MessageDto sendMessage(Authentication authentication, @RequestBody SendMessageDto sendMessageDto) {

        sendMessageDto.setAuthor(getCurrentUser(authentication));
        List<User> users = userManagementService.getAllUserByEmail(sendMessageDto.getEmails());

        return MessageMapper.mapMessageToMessageDto(assignUserMessageToMsg(messageService
                .sendMessage(MessageMapper.SendMessageDtoMapToMessage(sendMessageDto), sendMessageDto.getEmails()), users));
    }

    @PostMapping("to_parents")
    public MessageDto sendMessageToAllParents(Authentication authentication, @RequestBody SendMessageDto sendMessageDto) {

        sendMessageDto.setAuthor(getCurrentUser(authentication));
        List<User> users = userManagementService.getAllParents();
        return MessageMapper.mapMessageToMessageDto(assignUserMessageToMsg(messageService
                .sendMessage(MessageMapper.SendMessageDtoMapToMessage(sendMessageDto), sendMessageDto.getEmails()), users));
    }

    @PostMapping("to_class/{classId}")
    public MessageDto sendMessageToClass(Authentication authentication,@PathVariable Long classId, @RequestBody SendMessageDto sendMessageDto) {

        sendMessageDto.setAuthor(getCurrentUser(authentication));
        List<Long> childrenIds = childService.getChildByClassIn(classId);
        List<User> users = List.copyOf(userManagementService.getAllParentsFromClass(childrenIds));

        return MessageMapper.mapMessageToMessageDto(assignUserMessageToMsg(messageService
                .sendMessage(MessageMapper.SendMessageDtoMapToMessage(sendMessageDto), sendMessageDto.getEmails()), users));
    }

    @GetMapping("read_msg/{msgId}")
    public MessageDto readMsg(Authentication authentication, @PathVariable Long msgId) {
        Long userId = getCurrentUser(authentication).getId();
        MessageDto messageDto = MessageMapper.mapMessageToMessageDto(messageService.readMsg(msgId, userId));
        messageService.msgIsRead(msgId, userId);
        return messageDto;
    }

    @GetMapping("received_messages")
    public List<MessageDto> getReceivedMessages(Authentication authentication) {
        Long userId = getCurrentUser(authentication).getId();
        return MessageMapper.mapMessagesToMessagesDto(messageService.getReceivedMessages(userId));
    }

    @GetMapping("sent_msg/{msgId}")
    public MessageDtoWithFieldIsRead getSentMsg(@PathVariable Long msgId) {
        Message message = messageService.getSentMsg(msgId);
        return MessageMapper.messageMapToMsgDtoWithFieldIsRead(message);
        //return MessageMapper.mapToDto(messageService.getSentMsg(msgId));
    }

    @GetMapping("{msgId}/to/{userId}")
    public boolean checkMessageIsRead(@PathVariable Long msgId, @PathVariable Long userId) {
        return messageService.checkMessageIsRead(msgId, userId);
    }

    private Message assignUserMessageToMsg(Message msg, List<User> users) {
        List<UserMessage> userMessageList = new ArrayList<>();
        users.forEach(user -> userMessageList.add(new UserMessage(user, msg, false)));
        msg.setUserMessageList(userMessageList);
        messageService.editMessage(msg);
        return msg;
    }

    private User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return userService.getCurrentUser(email);
    }
}
