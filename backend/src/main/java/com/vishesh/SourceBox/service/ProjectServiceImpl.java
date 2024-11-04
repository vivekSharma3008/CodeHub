package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.ChatException;
import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Chat;
import com.vishesh.SourceBox.model.Project;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatService chatService;

    @Autowired
    private InvitationService invitationService;

    @Override
    public Project createProject(Project project, Long userId) throws UserException {

        User user = userService.findUserById(userId);

        Project createdProject = new Project();
        createdProject.setOwner(user);
        createdProject.setTags(project.getTags());
        createdProject.setName(project.getName());
        createdProject.setCategory(project.getCategory());
        createdProject.setDescription(project.getDescription());
        createdProject.getTeam().add(user);

        Project savedProject = projectRepository.save(createdProject);
//        savedProject.getTeam().add(user);

//        System.out.println(savedProject.getTeam().size());

        Chat chat = new Chat();
        chat.setProject(savedProject);

        List<User> chat_users = new ArrayList<>();
        chat_users.add(user);

        chat.setUsers(chat_users);

        Chat projectChat = chatService.createChat(chat);
        savedProject.setChat(projectChat);

        return savedProject;

    }

    @Override
    public List<Project> getProjectByTeam(User user, String category, String tag) throws ProjectException {

        List<Project> projects = projectRepository.findByTeamContainingOrOwner(user,user);

        if(category!=null){
            projects = projects.stream().filter(project -> project.getCategory().equals(category))
                    .collect(Collectors.toList());
        }
        if(tag!=null){
            projects=projects.stream().filter(project -> project.getTags().contains(tag))
                    .collect(Collectors.toList());
        }
        return projects;

    }

    @Override
    public Project getProjectById(Long projectId) throws ProjectException {

        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if(optionalProject.isEmpty()){
            throw new ProjectException("Project with project id: "+projectId+" not found!");
        }
        return optionalProject.get();

    }

    @Override
    public String deleteProject(Long projectId, Long userId) throws UserException {

        User user = userService.findUserById(userId);
        if(user!=null){
            projectRepository.deleteById(projectId);
            return "Project Deleted!";
        }

        throw new UserException("User doesn't exists!");

    }

    @Override
    public Project updateProject(Project updatedProject, Long id) throws ProjectException {

        Project project = getProjectById(id);

        if (project != null) {
            if (updatedProject.getName() != null) {
                project.setName(updatedProject.getName());
            }

            if (updatedProject.getDescription() != null) {
                project.setDescription(updatedProject.getDescription());
            }

            if (updatedProject.getTags() != null) {
                project.setTags(updatedProject.getTags());
            }

            return projectRepository.save(project);
        }

        throw new ProjectException("Project does not exist");

    }

    @Override
    @Transactional
    public void addUserToProject(Long projectId, Long userId) throws UserException, ProjectException {

        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ProjectException("Project not Found!"));
        User user = userService.findUserById(userId);

        if(!project.getTeam().contains(user)){
            project.getChat().getUsers().add(user);
            project.getTeam().add(user);
        }

        projectRepository.save(project);

    }

    @Override
    public void removeUserFromProject(Long projectId, Long userId) throws UserException, ProjectException {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectException("Project not Found"));
        User user = userService.findUserById(userId);

        if(project.getTeam().contains(user)){
            project.getChat().getUsers().remove(user);
            project.getTeam().remove(user);
        }
        projectRepository.save(project);

    }

    @Override
    public Chat getChatByProjectId(Long projectId) throws ProjectException, ChatException {

        Project project =projectRepository.findById(projectId).orElseThrow(()-> new ProjectException("Project not Found"));

        if(project!=null){
            return project.getChat();
        }

        throw new ChatException("No Chat Found!");

    }

    @Override
    public List<Project> searchProjects(String keyword, User user) throws ProjectException {

        String partialName = "%"+keyword+"%";

        List<Project> list = projectRepository.findByNameContainingAndTeamContaining(keyword,user);
        if(list!=null){
            return list;
        }
        throw new ProjectException("No Projects Available");

    }

    public List<User> getUsersByProjectId(Long projectId) throws ProjectException {
        Project project = projectRepository.findById(projectId).orElse(null);
        if( project != null) return project.getChat().getUsers();

        throw new ProjectException("no project found with id "+projectId);
    }


}
