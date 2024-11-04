package com.vishesh.SourceBox.controller;

import com.vishesh.SourceBox.exception.ChatException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RealTimeChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{groupId}")
    public Message sendToUser(@Payload Message message, @DestinationVariable String groupId) throws UserException, ChatException{
        simpMessagingTemplate.convertAndSendToUser(groupId,"/private",message);
        return message;
    }

}
