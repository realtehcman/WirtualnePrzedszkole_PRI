package com.example.wirtualneprzedszkole.model.dto.message;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@Builder
public class MessageDtoWithFieldIsRead {
    private Long id;
    private String author;
    private List<UserReadMsg> to;
    private String subject;
    private String content;
}
