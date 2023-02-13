package com.example.wirtualneprzedszkole.controller.message;

import com.example.wirtualneprzedszkole.mapper.message.MessageMapper;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dao.message.Message;
import com.example.wirtualneprzedszkole.model.dao.message.UserMessage;
import com.example.wirtualneprzedszkole.model.dto.message.MessageDto;
import com.example.wirtualneprzedszkole.model.dto.message.MessageDtoWithFieldIsRead;
import com.example.wirtualneprzedszkole.model.dto.message.MessageToRecipientDto;
import com.example.wirtualneprzedszkole.model.dto.message.SendMessageDto;
import com.example.wirtualneprzedszkole.service.ChildService;
import com.example.wirtualneprzedszkole.service.UserManagementService;
import com.example.wirtualneprzedszkole.service.UserService;
import com.example.wirtualneprzedszkole.service.message.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping
    public List<MessageDto> getAllSentMessages() {
        Long userId = userService.getCurrentUser().getId();
        return MessageMapper.mapMessagesToMessagesDto(messageService.getAllSentMessages(userId));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @PostMapping
    public ResponseEntity<MessageDto> sendMessage(Authentication authentication, @RequestBody SendMessageDto sendMessageDto) {

        sendMessageDto.setAuthor(getCurrentUser(authentication));
        List<User> users = userManagementService.getAllUserByName(sendMessageDto.getTo());

        if (users.size() > 0) {
            return new ResponseEntity<>(MessageMapper.mapMessageToMessageDto(assignUserMessageToMsg(messageService
                    .sendMessage(MessageMapper.SendMessageDtoMapToMessage(sendMessageDto), users), users)), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @PostMapping("to_parents")
    public MessageDto sendMessageToAllParents(Authentication authentication, @RequestBody SendMessageDto sendMessageDto) {

        sendMessageDto.setAuthor(getCurrentUser(authentication));
        List<User> users = userManagementService.getAllParents();
        return MessageMapper.mapMessageToMessageDto(assignUserMessageToMsg(messageService
                .sendMessage(MessageMapper.SendMessageDtoMapToMessage(sendMessageDto), users), users));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @PostMapping("to_class/{classId}")
    public MessageDto sendMessageToClass(Authentication authentication,@PathVariable Long classId, @RequestBody SendMessageDto sendMessageDto) {

        sendMessageDto.setAuthor(getCurrentUser(authentication));
        List<Long> childrenIds = childService.getChildByClassIn(classId);
        List<User> users = List.copyOf(userManagementService.getAllParentsFromClass(childrenIds));

        return MessageMapper.mapMessageToMessageDto(assignUserMessageToMsg(messageService
                .sendMessage(MessageMapper.SendMessageDtoMapToMessage(sendMessageDto), users), users));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping("read_msg/{msgId}")
    public MessageToRecipientDto readMsg(Authentication authentication, @PathVariable Long msgId) {
        Long userId = getCurrentUser(authentication).getId();
        MessageToRecipientDto messageDto = MessageMapper.mapMessageToMessageToRecipientDto(messageService.readMsg(msgId, userId));
        messageService.msgIsRead(msgId, userId);
        return messageDto;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping("received_messages")
    public List<MessageToRecipientDto> getReceivedMessages(Authentication authentication) {
        Long userId = getCurrentUser(authentication).getId();
        return MessageMapper.mapMessagesToMessageToRecipientsDto(messageService.getReceivedMessages(userId));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping("sent_msg/{msgId}")
    public MessageDtoWithFieldIsRead getSentMsg(@PathVariable Long msgId) {
        Message message = messageService.getSentMsg(msgId);
        return MessageMapper.messageMapToMsgDtoWithFieldIsRead(message);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping("{msgId}/to/{userId}")
    public boolean checkMessageIsRead(@PathVariable Long msgId, @PathVariable Long userId) {
        return messageService.checkMessageIsRead(msgId, userId);
    }

    private Message assignUserMessageToMsg(Message msg, List<User> users) {
        List<UserMessage> userMessageList = new ArrayList<>();
        users.forEach(user -> userMessageList.add(new UserMessage(user, msg, false, false)));
        msg.setUserMessageList(userMessageList);
        messageService.editMessage(msg);
        return msg;
    }

    private User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return userService.getCurrentUser(email);
    }


    @DeleteMapping("{id}")
    public void deleteClass(@PathVariable Long id) {
        messageService.deleteMessage(id);
    }

    @PatchMapping("/deleteReceivedMsg/{msgId}")
    public void deleteReceivedMsg(@PathVariable Long msgId) {
        messageService.deleteReceivedMsg(msgId, userService.getCurrentUser().getId());
    }

}
