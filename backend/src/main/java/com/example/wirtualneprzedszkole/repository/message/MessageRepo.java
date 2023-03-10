package com.example.wirtualneprzedszkole.repository.message;

import com.example.wirtualneprzedszkole.model.dao.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {
    @Query("Select m From Message m join m.author aMsg where aMsg.id = :userId")
    List<Message> findAllMessage(Long userId);

    @Query("select m from Message m join m.userMessageList uML where uML.user.id = :userId and m.id = :msgId")
    Message readMsg(Long msgId, Long userId);

    @Query("select m from Message m join m.userMessageList uML where uML.user.id = :userId and uML.isDelete = false")
    List<Message> getReceivedMessages(Long userId);

    @Modifying
    @Query("update UserMessage um set um.isRead = :state where um.user.id = :userId and um.message.id = :msgId")
    void msgIsRead(Long msgId, Long userId, boolean state);

    @Query("select uML.isRead from Message m join m.userMessageList uML where uML.user.id = :userId and uML.message.id = :msgId")
    Optional<Boolean> checkMessageIsRead(Long msgId, Long userId);

    @Modifying
    @Query("update UserMessage um set um.isDelete = :state where um.user.id = :userId and um.message.id = :msgId")
    void deleteReceivedMsg(Long msgId, Long userId, boolean state);
}
