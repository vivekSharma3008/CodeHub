package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.ChatException;
import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Chat;
import com.vishesh.SourceBox.model.Message;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.repository.MessageRepository;
import com.vishesh.SourceBox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService{

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectService projectService;

    @Override
    public Message sendMessage(Long senderId, Long projectId, String content) throws UserException, ChatException, ProjectException {

        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new UserException("User not found with id: "+senderId));

        Chat chat = projectService.getProjectById(projectId).getChat();

        Message message = new Message();
        message.setContent(content);
        message.setSender(sender);
        message.setCreatedAt(LocalDateTime.now());
        message.setChat(chat);
        Message savedMessage = messageRepository.save(message);

        chat.getMessages().add(savedMessage);
        return savedMessage;

    }

    @Override
    public List<Message> getMessageByProjectId(Long projectId) throws ProjectException, ChatException {

        Chat chat = projectService.getChatByProjectId(projectId);
        List<Message> messages = messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());

        return messages;

    }
}
