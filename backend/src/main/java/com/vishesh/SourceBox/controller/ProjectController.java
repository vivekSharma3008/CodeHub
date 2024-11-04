package com.vishesh.SourceBox.controller;

import com.vishesh.SourceBox.exception.ChatException;
import com.vishesh.SourceBox.exception.MailsException;
import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Chat;
import com.vishesh.SourceBox.model.Invitation;
import com.vishesh.SourceBox.model.Project;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.request.InviteRequest;
import com.vishesh.SourceBox.response.MessageResponse;
import com.vishesh.SourceBox.service.InvitationService;
import com.vishesh.SourceBox.service.ProjectService;
import com.vishesh.SourceBox.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Autowired
    private InvitationService invitationService;

    @GetMapping
    public ResponseEntity<List<Project>> getProjects(
            @RequestParam(required=false) String category,
            @RequestParam(required = false) String tag,
            @RequestHeader("Authorization") String jwt
    ) throws ProjectException, UserException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Project> projects = projectService.getProjectByTeam(user,category,tag);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(
            @PathVariable Long projectId
    ) throws ProjectException {

        Project project = projectService.getProjectById(projectId);
        return project!=null?
                new ResponseEntity<>(project, HttpStatus.OK):
                new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Project project
    ) throws UserException, ProjectException {
        User user = userService.findUserProfileByJwt(jwt);
        project.setOwner(user);

        Project createdProject = projectService.createProject(project,user.getId());
        userService.updateUserProjectSize(user,1);


        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt,
            @RequestBody Project project
    ) throws UserException, ProjectException {
        User user = userService.findUserProfileByJwt(jwt);
        Project updatedProject = projectService.updateProject(project,projectId);
        return updatedProject!=null?
                new ResponseEntity<>(updatedProject, HttpStatus.OK):
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<MessageResponse> deleteProject(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, ProjectException {
        User user = userService.findUserProfileByJwt(jwt);
        MessageResponse res = new MessageResponse(projectService.deleteProject(projectId,user.getId()));
        return ResponseEntity.ok(res);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProject(
            @RequestParam(required = false)String keyword,
            @RequestHeader("Authorization") String jwt
    ) throws ProjectException, UserException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Project> projects = projectService.searchProjects(keyword,user);
        return ResponseEntity.ok(projects);
    }

    @PostMapping("/{userId}/add-to-project/{projectId}")
    public ResponseEntity<MessageResponse> addUserToProject(
            @PathVariable Long userId,
            @PathVariable Long projectId) throws UserException, ProjectException {
        projectService.addUserToProject(projectId, userId);
        MessageResponse response =new MessageResponse("User added to the project successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat> getChatByProjectId(
            @PathVariable Long projectId
    ) throws ProjectException, ChatException {
        Chat chat = projectService.getChatByProjectId(projectId);
        return chat!=null ? ResponseEntity.ok(chat) : ResponseEntity.notFound().build();
    }

    @PostMapping("/invite")
    public ResponseEntity<MessageResponse> inviteProject(
            @RequestBody InviteRequest req
    ) throws MailsException, MessagingException {

        invitationService.sendInvitation(req.getEmail(),req.getProjectId());
        MessageResponse res = new MessageResponse();
        res.setMessage("User invited to project successfully!");
        return ResponseEntity.ok(res);

    }

    @GetMapping("/accept_invitation")
    public ResponseEntity<Invitation> acceptInviteProject(
            @RequestParam String token,
            @RequestHeader("Authorization") String jwt
            ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        Invitation invitation = invitationService.acceptInvitation(token,user.getId());
        projectService.addUserToProject(invitation.getProjectId(),user.getId());
        return new ResponseEntity<>(invitation, HttpStatus.ACCEPTED);

    }

}
