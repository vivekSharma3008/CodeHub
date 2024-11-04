package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.ChatException;
import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Chat;
import com.vishesh.SourceBox.model.Project;
import com.vishesh.SourceBox.model.User;

import java.util.List;

public interface ProjectService {

    Project createProject(Project project, Long userId) throws UserException;

    List<Project> getProjectByTeam(User user, String category, String tag) throws ProjectException;

    Project getProjectById(Long projectId) throws ProjectException;

    String deleteProject(Long projectId, Long userId) throws UserException;

    Project updateProject(Project updatedProject, Long id) throws ProjectException;

    void addUserToProject(Long projectId, Long userId) throws UserException, ProjectException;

    void removeUserFromProject(Long projectId, Long userId) throws UserException, ProjectException;

    Chat getChatByProjectId(Long projectId) throws ProjectException, ChatException;

    List<Project> searchProjects(String keyword, User user) throws ProjectException;
}
