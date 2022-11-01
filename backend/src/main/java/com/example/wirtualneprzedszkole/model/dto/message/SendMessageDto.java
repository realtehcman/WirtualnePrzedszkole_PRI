package com.example.wirtualneprzedszkole.model.dto.message;

import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dao.message.UserMessage;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SendMessageDto {
    private Long id;
    private User author;
    private List<String> to;
    //private boolean isRead;
    private String subject;
    private String content;
    //private List<UserMessage> userMessageList;

}
