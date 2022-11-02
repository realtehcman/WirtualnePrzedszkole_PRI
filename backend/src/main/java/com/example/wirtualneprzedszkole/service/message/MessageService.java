package com.example.wirtualneprzedszkole.service.message;

import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dao.message.Message;
import com.example.wirtualneprzedszkole.model.dao.message.UserMessage;
import com.example.wirtualneprzedszkole.repository.message.MessageRepo;
import com.example.wirtualneprzedszkole.service.EmailSenderServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepo messageRepo;
    private final EmailSenderServiceImpl emailSenderService;

    public List<Message> getAllSentMessages() {
        return messageRepo.findAllMessage();
    }

    public Message sendMessage(Message message, List<User> users) {
        Message msg = messageRepo.save(message);
        String subject = msg.getSubject();
        //Wysyłanie powiadomienia narazie zakomentowane bo wysypuje sie,
        //gdy adres mail nieistnieje
        /*users.forEach(e -> emailSenderService.sendEmail(e.getEmail(), subject,
                "Sprawdź nową wiadomość na twoim koncie "));*/
        return msg;
    }

    public Message readMsg(Long msgId, Long userId) {
        return messageRepo.readMsg(msgId, userId);
    }

    @Transactional
    public void msgIsRead(Long msgId, Long userId) {
        messageRepo.msgIsRead(msgId, userId, true);
    }

    public List<Message> getReceivedMessages(Long userId) {
        return messageRepo.getReceivedMessages(userId);
    }

    public Message getSentMsg(Long msgId) {
        return messageRepo.findById(msgId).orElseThrow();
    }

    @Transactional
    public void editMessage(Message msg) {
        Message messageEdit = messageRepo.findById(msg.getId()).orElseThrow();
        messageEdit.setUserMessageList(msg.getUserMessageList());
    }

    public boolean checkMessageIsRead(Long msgId, Long userId) {
        return messageRepo.checkMessageIsRead(msgId, userId).orElseThrow(NullPointerException::new);
    }
}
