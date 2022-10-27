package com.example.wirtualneprzedszkole.model.dto.message;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;


@Getter
@Setter
@Builder
public class MessageDtoWithIsRead {
    private Long id;
    private String author;
    private Map<String, Boolean> to;
    private String subject;
    private String content;
}
