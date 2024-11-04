package com.vishesh.SourceBox.controller;

import com.vishesh.SourceBox.exception.ChatException;
import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Chat;
import com.vishesh.SourceBox.model.Message;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.request.MessageRequest;
import com.vishesh.SourceBox.service.MessageService;
import com.vishesh.SourceBox.service.ProjectService;
import com.vishesh.SourceBox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(
            @RequestBody MessageRequest request
    ) throws UserException, ChatException, ProjectException {

        User user = userService.findUserById(request.getSenderId());
        if(user==null) throw new UserException("User not found with id: "+request.getSenderId());

        Chat chats = projectService.getProjectById(request.getProjectId()).getChat();
        if(chats==null) throw new ChatException("Chat not found!");

        Message sentMessage = messageService.sendMessage(request.getSenderId(),request.getProjectId(),request.getContent());
        return ResponseEntity.ok(sentMessage);

    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByChatId(@PathVariable Long projectId) throws ProjectException, ChatException{

        List<Message> messages = messageService.getMessageByProjectId(projectId);

        return ResponseEntity.ok(messages);

    }

}
