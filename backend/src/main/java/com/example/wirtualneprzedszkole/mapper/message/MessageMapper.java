package com.example.wirtualneprzedszkole.mapper.message;


import com.example.wirtualneprzedszkole.mapper.UserMapper;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dao.message.Message;
import com.example.wirtualneprzedszkole.model.dao.message.UserMessage;
import com.example.wirtualneprzedszkole.model.dto.UserDto;
import com.example.wirtualneprzedszkole.model.dto.message.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class MessageMapper {
    private MessageMapper(){}


    public static List<UserEmailDto> userMessagesMapToUsersEmailsDto(List<UserMessage> users) {
        return users.stream()
                .map(MessageMapper::userMessageMapToUserEmailDto)
                .collect(Collectors.toList());
    }

    public static UserEmailDto userMessageMapToUserEmailDto(UserMessage user) {
        return UserEmailDto.builder()
                .email(user.getUser().getEmail())
                .build();
    }

    public static UserEmailDto userMapToUserEmailDto(User user) {
        return UserEmailDto.builder()
                .email(user.getEmail())
                .build();
    }

    public static List<String> userEmailsDtoMapToFieldToFromMessageDto(List<UserEmailDto> userEmailsDto) {
        return userEmailsDto.stream()
                .map(UserEmailDto::getEmail)
                .collect(Collectors.toList());
    }

    public static Message SendMessageDtoMapToMessage(SendMessageDto msgDto) {
        return Message.builder()
                .id(msgDto.getId())
                .author(msgDto.getAuthor())
                .content(msgDto.getContent())
                .subject(msgDto.getSubject())
                .build();
    }

    public static List<UserDto> userMessagesMapToUsersDto(List<UserMessage> userMessageList) {
        return userMessageList.stream()
                .map(MessageMapper::userMessageMapToUserDto)
                .collect(Collectors.toList());
    }

    public static UserDto userMessageMapToUserDto(UserMessage userMessage) {
        return UserDto.builder()
                .name(userMessage.getUser().getName())
                .lastName(userMessage.getUser().getLastName())
                .email(userMessage.getUser().getEmail())
                .build();
    }

    public static List<MessageDto> mapMessagesToMessagesDto(List<Message> messages) {
        return messages.stream()
                .map(MessageMapper::mapMessageToMessageDto)
                .collect(Collectors.toList());
    }

    public static MessageDto mapMessageToMessageDto(Message message) {
        return MessageDto.builder()
                .id(message.getId())
                //.to(userEmailsDtoMapToFieldToFromMessageDto(userMessagesMapToUsersEmailsDto(message.getUserMessageList())))
                .to(userMessagesMapToUsersDto(message.getUserMessageList()))
                .content(message.getContent())
                .author(userMapToUserEmailDto(message.getAuthor()).getEmail())
                .subject(message.getSubject())
                .build();
    }

    public static List<MessageToRecipientDto> mapMessagesToMessageToRecipientsDto(List<Message> messages) {
        return messages.stream()
                .map(MessageMapper::mapMessageToMessageToRecipientDto)
                .collect(Collectors.toList());
    }

    public static MessageToRecipientDto mapMessageToMessageToRecipientDto(Message message) {
        return MessageToRecipientDto.builder()
                .id(message.getId())
                //.to(userEmailsDtoMapToFieldToFromMessageDto(userMessagesMapToUsersEmailsDto(message.getUserMessageList())))
                .content(message.getContent())
                .author(userMapToUserEmailDto(message.getAuthor()).getEmail())
                .subject(message.getSubject())
                .build();
    }

    public static Map<String, Boolean> MailAndIsReadMapToKeyValue(List<String> keys, List<UserMessage> userMessageList) {
        List<Boolean> values = userMessageList.stream().map(UserMessage::isRead).collect(Collectors.toList());

        return IntStream.range(0, keys.size()).boxed()
                .collect(Collectors.toMap(keys::get, values::get));

    }

    public static MessageDtoWithFieldIsRead messageMapToMsgDtoWithFieldIsRead(Message message) {
        return MessageDtoWithFieldIsRead.builder()
                .id(message.getId())
                .to(MailAndIsReadMapToKeyValue(userEmailsDtoMapToFieldToFromMessageDto(userMessagesMapToUsersEmailsDto(message.getUserMessageList())), message.getUserMessageList()))
                .content(message.getContent())
                .author(userMapToUserEmailDto(message.getAuthor()).getEmail())
                .subject(message.getSubject())
                .build();
    }

}
