package com.example.wirtualneprzedszkole.mapper;

import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dto.ChildDto;
import com.example.wirtualneprzedszkole.model.dto.UserDto;
import com.example.wirtualneprzedszkole.model.dto.UserWithChildClassNameDto;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {

    private UserMapper(){}


    public static List<UserDto> mapToDto(List<User> users) {
        return users.stream()
                .sorted(Comparator.comparing(User::getId))
                .map(UserMapper::mapToDto)
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
                .opis(user.getOpis())
                .children(ChildMapper.mapToChildDto(user.getChildren()))
                .classes(ClassMapper.mapToGroupDto(user.getClasses()))
                .build();
    }

    public static UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .lastName(user.getLastName())
                .picture(user.getPicture())
                .address(user.getAddress())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .opis(user.getOpis())
                .build();
    }

    public static User mapToDao(UserDto userDto) {
        return User.builder()
                .id(userDto.getId())
                .email(userDto.getEmail())
                .name(userDto.getName())
                .lastName(userDto.getLastName())
                .picture(userDto.getPicture())
                .address(userDto.getAddress())
                .phoneNumber(userDto.getPhoneNumber())
                .role(userDto.getRole())
                .opis(userDto.getOpis())
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
                .opis(userDto.getOpis())
                .children(ChildMapper.mapToChildDao(userDto.getChildren()))
                //.classes(ClassMapper.mapToClassDao(userDto.getClasses()))
                .build();
    }

    public static UserWithChildClassNameDto mapToUserDtoWIthClassName(UserDto userDto, HashMap<ChildDto, String> children) {
        return UserWithChildClassNameDto.builder()
                .id(userDto.getId())
                .email(userDto.getEmail())
                .name(userDto.getName())
                .lastName(userDto.getLastName())
                .picture(userDto.getPicture())
                .address(userDto.getAddress())
                .phoneNumber(userDto.getPhoneNumber())
                .role(userDto.getRole())
                .opis(userDto.getOpis())
                .children(ChildMapper.mapToChildrenWithClassName(children))
                //.classes(ClassMapper.mapToGroupDto(userDto.getClasses()))
                .build();
    }

    public static UserWithChildClassNameDto mapToUserDtoWIthClassName(UserDto userDto) {
        return UserWithChildClassNameDto.builder()
                .id(userDto.getId())
                .email(userDto.getEmail())
                .name(userDto.getName())
                .lastName(userDto.getLastName())
                .picture(userDto.getPicture())
                .address(userDto.getAddress())
                .phoneNumber(userDto.getPhoneNumber())
                .role(userDto.getRole())
                .opis(userDto.getOpis())
                .childrenWithoutClassName(userDto.getChildren())
                //.classes(ClassMapper.mapToGroupDto(userDto.getClasses()))
                .build();
    }
}
