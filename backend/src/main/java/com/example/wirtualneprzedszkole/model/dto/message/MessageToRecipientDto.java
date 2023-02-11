package com.example.wirtualneprzedszkole.model.dto.message;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
public class MessageToRecipientDto {
    private Long id;
    private String author;
    private String subject;
    private String content;
    private Timestamp sentDate;
}
