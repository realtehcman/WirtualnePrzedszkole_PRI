package com.example.wirtualneprzedszkole.mapper;

import com.example.wirtualneprzedszkole.model.User;
import com.example.wirtualneprzedszkole.model.UserDto;

import java.util.List;
import java.util.stream.Collectors;

public class UserDtoMapper {

    private UserDtoMapper(){}

    public static List<UserDto> mapToUserDto(List<User> users) {
        return users.stream()
                .map(UserDtoMapper::mapToUserDto)
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
}
