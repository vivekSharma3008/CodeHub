package com.vishesh.SourceBox.controller;

import com.vishesh.SourceBox.DTO.IssueDTO;
import com.vishesh.SourceBox.exception.IssueException;
import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Issue;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.request.IssueRequest;
import com.vishesh.SourceBox.response.AuthResponse;
import com.vishesh.SourceBox.service.IssueService;
import com.vishesh.SourceBox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private UserService userService;

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long issueId) throws IssueException{

        return ResponseEntity.ok(issueService.getIssueById(issueId).get());

    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> getIssueByProjectId(@PathVariable Long projectId) throws ProjectException {

        return ResponseEntity.ok(issueService.getIssueByProjectId(projectId));

    }

    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(
            @RequestBody IssueRequest issue,
            @RequestHeader("Authorization") String token
            ) throws Exception {
        User tokenUser = userService.findUserProfileByJwt(token);
        User user = userService.findUserById(tokenUser.getId());

        if(user!=null){
            Issue createdIssue = issueService.createIssue(issue, tokenUser.getId());
            IssueDTO issueDTO=new IssueDTO();
            issueDTO.setDescription(createdIssue.getDescription());
            issueDTO.setDueDate(createdIssue.getDueDate());
            issueDTO.setId(createdIssue.getId());
            issueDTO.setPriority(createdIssue.getPriority());
            issueDTO.setProject(createdIssue.getProject());
            issueDTO.setProjectID(createdIssue.getProjectID());
            issueDTO.setStatus(createdIssue.getStatus());
            issueDTO.setTitle(createdIssue.getTitle());
            issueDTO.setTags(createdIssue.getTags());
            issueDTO.setAssignee(createdIssue.getAssignee());

            return ResponseEntity.ok(issueDTO);
        } else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/{issueId}")
    public ResponseEntity<Issue> updateIssue(
            @PathVariable Long issueId,
            @RequestBody IssueRequest updatedIssue,
            @RequestHeader("Authorization") String token
    ) throws IssueException, UserException, ProjectException {
        User user = userService.findUserProfileByJwt(token);
        Issue updated = issueService.updateIssue(issueId, updatedIssue, user.getId()).get();

        return updated != null ?
                ResponseEntity.ok(updated):
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<AuthResponse> deleteIssue(
            @PathVariable Long issueId,
            @RequestHeader("Authorization") String token
    ) throws UserException, IssueException, ProjectException {

        User user = userService.findUserProfileByJwt(token);
        String deleted = issueService.deleteIssue(issueId,user.getId());

        AuthResponse res = new AuthResponse();
        res.setMessage("Issue with id: "+issueId+" deleted!");
        res.setStatus(true);

        return ResponseEntity.ok(res);

    }

    @GetMapping("/search")
    public ResponseEntity<List<Issue>> searchIssue(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Long assigneeId
    ) throws IssueException {

        List<Issue> filteredIssues = issueService.searchIssues(title,status,priority,assigneeId);
        return ResponseEntity.ok(filteredIssues);

    }

    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(
            @PathVariable Long issueId,
            @PathVariable Long userId
    ) throws UserException, IssueException {

        Issue issue = issueService.addUserToIssue(issueId,userId);

        return ResponseEntity.ok(issue);

    }

    @GetMapping("/assignee/{assigneeId}")
    public ResponseEntity<List<Issue>> getIssuesByAssigneeId(@PathVariable Long assigneeId) throws IssueException {
        List<Issue> issues = issueService.getIssuesByAssigneeId(assigneeId);
        return ResponseEntity.ok(issues);
    }

    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue> updateIssueStatus(
            @PathVariable String status,
            @PathVariable Long issueId
    )throws IssueException{

        Issue issue = issueService.updateStatus(issueId,status);
        return ResponseEntity.ok(issue);

    }

}
