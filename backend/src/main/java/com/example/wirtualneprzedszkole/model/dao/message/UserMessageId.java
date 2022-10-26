package com.example.wirtualneprzedszkole.model.dao.message;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class UserMessageId implements Serializable {

    private Long user;

    private Long message;

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Long getMessage() {
        return message;
    }

    public void setMessage(Long message) {
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserMessageId)) return false;

        UserMessageId that = (UserMessageId) o;

        if (!user.equals(that.user)) return false;
        return message.equals(that.message);
    }

    @Override
    public int hashCode() {
        int result = user.hashCode();
        result = 31 * result + message.hashCode();
        return result;
    }
}
