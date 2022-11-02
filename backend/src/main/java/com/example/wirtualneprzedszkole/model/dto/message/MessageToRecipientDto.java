package com.example.wirtualneprzedszkole.model.dto.message;

import com.example.wirtualneprzedszkole.model.dto.UserDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MessageToRecipientDto {
    private Long id;
    private String author;
    private String subject;
    private String content;
}
