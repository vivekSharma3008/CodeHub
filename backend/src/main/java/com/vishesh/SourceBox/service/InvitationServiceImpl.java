package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.MailsException;
import com.vishesh.SourceBox.model.Invitation;
import com.vishesh.SourceBox.repository.InvitationRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitationServiceImpl implements InvitationService {

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public void sendInvitation(String email, Long projectId) throws MessagingException, MailsException {

        String token = UUID.randomUUID().toString();

        Invitation invitation = new Invitation();
        invitation.setEmail(email);
        invitation.setToken(token);
        invitation.setProjectId(projectId);

        invitationRepository.save(invitation);

        String invitationLink = "http://localhost:5173/accept_invitation?token="+token;
        emailService.sendEmailWithToken(email,invitationLink);

    }

    @Override
    public Invitation acceptInvitation(String token, Long userId) throws Exception {

        Invitation invitation = invitationRepository.findByToken(token);
        if(invitation==null){
            throw new Exception("Invalid Invitation Token: "+token);
        }

        return invitation;

    }

    @Override
    public String getTokenByUserMail(String userEmail) {

        Invitation invitation = invitationRepository.findByEmail(userEmail);

        return invitation.getToken();

    }

    @Override
    public void deleteToken(String token) {

        invitationRepository.deleteByToken(token);

    }
}
