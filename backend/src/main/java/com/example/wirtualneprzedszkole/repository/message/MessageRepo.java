package com.example.wirtualneprzedszkole.repository.message;

import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dao.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {
    @Query("Select m From Message m")
    List<Message> findAllMessage();

    @Query("select m from Message m join m.to t where t.id = :userId and m.id = :msgId")
    Message readMsg(Long msgId, Long userId);

    @Query("select m from Message m join m.to t where t.id = :userId")
    List<Message> getReceivedMessages(Long userId);

}
