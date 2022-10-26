package com.example.wirtualneprzedszkole.model.dao.message;

import com.example.wirtualneprzedszkole.model.dao.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties(value = {"messagesAuthor"})
    @ManyToOne
    @JoinColumn(name="userId")
    private User author;

    /*@JsonIgnoreProperties(value = {"messagesReceived"})
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(
            name = "message_to",
            joinColumns = @JoinColumn(name = "messageId"),
            inverseJoinColumns = @JoinColumn(name = "userId"))
    private List<User> to;*/
    //private boolean isRead;
    private String subject;
    private String content;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL)
    private List<UserMessage> userMessageList;
}
