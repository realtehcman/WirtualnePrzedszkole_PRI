package com.example.wirtualneprzedszkole.mapper;

import com.example.wirtualneprzedszkole.model.User;
import com.example.wirtualneprzedszkole.model.UserDto;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {

    private UserMapper(){}

    public static List<UserDto> mapToUserDto(List<User> users) {
        return users.stream()
                .map(UserMapper::mapToUserDto)
                .collect(Collectors.toList());
    }

    public static UserDto mapToUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .lastName(user.getLastName())
                .picture(user.getPicture())
                .address(user.getAddress())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .build();
    }

    public static User mapToUserDao(UserDto userDto) {
        return User.builder()
                .id(userDto.getId())
                .email(userDto.getEmail())
                .name(userDto.getName())
                .lastName(userDto.getLastName())
                .picture(userDto.getPicture())
                .address(userDto.getAddress())
                .phoneNumber(userDto.getPhoneNumber())
                .role(userDto.getRole())
                .build();
    }
}
