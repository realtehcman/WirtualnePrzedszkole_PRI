package com.example.wirtualneprzedszkole.mapper.message;

import com.example.wirtualneprzedszkole.model.dao.message.Message;
import com.example.wirtualneprzedszkole.model.dao.message.UserMessage;
import com.example.wirtualneprzedszkole.model.dto.UserDto;
import com.example.wirtualneprzedszkole.model.dto.message.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class MessageMapper {
    private MessageMapper(){}

    public static Message SendMessageDtoMapToMessage(SendMessageDto msgDto) {
        return Message.builder()
                .id(msgDto.getId())
                .author(msgDto.getAuthor())
                .content(msgDto.getContent())
                .subject(msgDto.getSubject())
                .build();
    }

    public static List<UserDto> userMessagesMapToUsersDto(List<UserMessage> userMessageList) {
        return Optional.ofNullable(userMessageList).orElse(Collections.emptyList()).stream()
                .map(MessageMapper::userMessageMapToUserDto)
                .collect(Collectors.toList());
    }

    public static UserDto userMessageMapToUserDto(UserMessage userMessage) {
        return UserDto.builder()
                .name(userMessage.getUser().getName())
                .lastName(userMessage.getUser().getLastName())
                .email(userMessage.getUser().getEmail())
                .phoneNumber(userMessage.getUser().getPhoneNumber())
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
                .to(userMessagesMapToUsersDto(message.getUserMessageList()))
                .content(message.getContent())
                .author(message.getAuthor().getName() + " " + message.getAuthor().getLastName()
                        + " (" + message.getAuthor().getEmail() + ")")
                .subject(message.getSubject())
                .sentDate(message.getSentDate())
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
                .content(message.getContent())
                .author(message.getAuthor().getName() + " " + message.getAuthor().getLastName()
                        + " (" + message.getAuthor().getEmail() + ")")
                .subject(message.getSubject())
                .sentDate(message.getSentDate())
                .build();
    }

    public static MessageDtoWithFieldIsRead messageMapToMsgDtoWithFieldIsRead(Message message) {
        return MessageDtoWithFieldIsRead.builder()
                .id(message.getId())
                .to(userMessagesMapToUserReadMsg(message.getUserMessageList()))
                .content(message.getContent())
                .author(message.getAuthor().getName() + " " + message.getAuthor().getLastName()
                        + " (" + message.getAuthor().getEmail() + ")")
                .subject(message.getSubject())
                .build();
    }

    private static List<UserReadMsg> userMessagesMapToUserReadMsg(List<UserMessage> userMessageList) {
        return userMessageList.stream()
                .map(MessageMapper::userMessageMapToUserReadMsg)
                .collect(Collectors.toList());
    }

    static UserReadMsg userMessageMapToUserReadMsg(UserMessage userMessage) {
        return UserReadMsg.builder()
                .name(userMessage.getUser().getName())
                .lastName(userMessage.getUser().getLastName())
                .email(userMessage.getUser().getEmail())
                .isRead(userMessage.isRead())
                .build();
    }

}
