package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.MailsException;
import jakarta.mail.MessagingException;

public interface EmailService {

    void sendEmailWithToken(String userEmail, String link) throws MessagingException, MailsException;

}
