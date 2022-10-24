package com.example.wirtualneprzedszkole.service.message;

import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dao.message.Message;
import com.example.wirtualneprzedszkole.repository.message.MessageRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepo messageRepo;

    public List<Message> getAllSentMessages() {
        return messageRepo.findAllMessage();
    }

    public Message sendMessage(Message message) {
        return messageRepo.save(message);
    }

    public Message readMsg(Long msgId, Long userId) {
        return messageRepo.readMsg(msgId, userId);
    }
}
