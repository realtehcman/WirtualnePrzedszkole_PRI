package com.example.wirtualneprzedszkole.model.dto.message;

import com.example.wirtualneprzedszkole.model.dao.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MessageDto {
    private Long id;
    private String author;
    private List<String> to;
    private boolean isRead;
    private String subject;
    private String content;
}
