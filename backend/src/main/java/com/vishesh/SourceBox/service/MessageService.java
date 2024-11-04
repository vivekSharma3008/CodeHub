package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.ChatException;
import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Message;

import java.util.List;

public interface MessageService {

    Message sendMessage(Long senderId, Long projectId, String content) throws UserException, ChatException, ProjectException;

    List<Message> getMessageByProjectId(Long projectId) throws ProjectException, ChatException;

}
