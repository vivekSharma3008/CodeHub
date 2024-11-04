package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.MailsException;
import com.vishesh.SourceBox.model.Invitation;
import jakarta.mail.MessagingException;

public interface InvitationService {

    public void sendInvitation(String email, Long projectId) throws MessagingException, MailsException;

    public Invitation acceptInvitation(String token, Long userId) throws Exception;

    public String getTokenByUserMail(String userEmail);

    public void deleteToken(String token);

}
