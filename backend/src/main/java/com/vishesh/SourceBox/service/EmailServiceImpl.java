package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.MailsException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendEmailWithToken(String userEmail, String link) throws MessagingException, MailsException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,"utf-8");

        String subject = "Join Project Team Invitation";
        String text = "You are invited to join the project.\nInvited by: "+userEmail+"\nClick the link to join the project team: "+link;

        helper.setSubject(subject);
        helper.setText(text,true);
        helper.setTo(userEmail);

        try{
            javaMailSender.send(mimeMessage);
        }
        catch(MailException ex){
            throw new MailsException("Failed to send email! "+ex);
        }

    }
}
