package com.example.wirtualneprzedszkole.model.dao.message;

import com.example.wirtualneprzedszkole.model.dao.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(UserMessageId.class)
public class UserMessage {

    @Id
    @ManyToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "message", referencedColumnName = "id")
    private Message message;

    //@Column(name = "isRead", nullable = false)
    private boolean isRead;
}
