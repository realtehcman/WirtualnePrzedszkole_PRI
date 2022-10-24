package com.example.wirtualneprzedszkole.model.dto.message;

import com.example.wirtualneprzedszkole.model.dao.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.List;

@Getter
@Setter
@Builder
public class SendMessageDto {
    private Long id;
    private User author;
    private List<String> emails;
    private boolean isRead;
    private String subject;
    private String content;
}
