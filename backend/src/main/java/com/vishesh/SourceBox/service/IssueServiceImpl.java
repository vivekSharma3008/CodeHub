package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.IssueException;
import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Issue;
import com.vishesh.SourceBox.model.Project;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.repository.IssueRepository;
import com.vishesh.SourceBox.request.IssueRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueServiceImpl implements IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationServiceImpl notificationServiceImpl;

    @Override
    public Optional<Issue> getIssueById(Long issueId) throws IssueException {

        Optional<Issue> issue = issueRepository.findById(issueId);
        if(issue.isPresent()){
            return issue;
        }
        throw new IssueException("No issue found with issueId: "+issueId);

    }

    @Override
    public List<Issue> getIssueByProjectId(Long projectId) throws ProjectException {

        projectService.getProjectById(projectId);
        return issueRepository.findByProjectId(projectId);

    }

    @Override
    public Issue createIssue(IssueRequest issueRequest, Long userId) throws UserException, ProjectException, IssueException {

        User user = getUserOrThrow(userId);

        Project project = projectService.getProjectById(issueRequest.getProjectId());
        if(project==null){
            throw new IssueException("Project not found with id: "+issueRequest.getProjectId());
        }

        Issue issue = new Issue();
        issue.setTitle(issueRequest.getTitle());
        issue.setDescription(issueRequest.getDescription());
        issue.setStatus(issueRequest.getStatus());
        issue.setProjectID(issueRequest.getProjectId());
        issue.setPriority(issueRequest.getPriority());
        issue.setDueDate(issueRequest.getDueDate());

        issue.setProject(project);

        return issueRepository.save(issue);

    }

    @Override
    public Optional<Issue> updateIssue(Long issueId, IssueRequest updatedIssue, Long userId) throws IssueException, UserException, ProjectException{

        User user = getUserOrThrow(userId);

        Optional<Issue> existingIssue = issueRepository.findById(issueId);

        if(existingIssue.isPresent()){
            Project project = projectService.getProjectById(updatedIssue.getProjectId());
            if(project==null){
                throw new IssueException("Project not found with Id: "+updatedIssue.getProjectId());
            }

            User assignee = userService.findUserById(updatedIssue.getUserId());
            if(assignee==null){
                throw new UserException("Assignee not found with Id: "+updatedIssue.getUserId());
            }

            Issue issueToUpdate = existingIssue.get();

            if(updatedIssue.getDescription()!=null){
                issueToUpdate.setDescription(updatedIssue.getDescription());
            }
            if (updatedIssue.getDueDate() != null) {
                issueToUpdate.setDueDate(updatedIssue.getDueDate());
            }
            if (updatedIssue.getPriority() != null) {
                issueToUpdate.setPriority(updatedIssue.getPriority());
            }
            if (updatedIssue.getStatus() != null) {
                issueToUpdate.setStatus(updatedIssue.getStatus());
            }
            if (updatedIssue.getTitle() != null) {
                issueToUpdate.setTitle(updatedIssue.getTitle());
            }

            return Optional.of(issueRepository.save(issueToUpdate));

        }
        throw new IssueException("Issue not found with Issue Id: "+issueId);

    }

    @Override
    public String deleteIssue(Long issueId, Long userId) throws UserException, IssueException {
        getUserOrThrow(userId);

        Optional<Issue> issueById = getIssueById(issueId);
        if(issueById.isPresent()){
            issueRepository.deleteById(issueId);
            return "Issue with Issue Id: "+issueId+" deleted!";
        }

        throw new IssueException("Issue not found with Issue Id: "+issueId);

    }

    @Override
    public List<Issue> getIssuesByAssigneeId(Long assigneeId) throws IssueException{

        List<Issue> issues = issueRepository.findByAssigneeId(assigneeId);
        if(issues!=null){
            return issues;
        }
        throw new IssueException("Issues not found!");
    }

    private User getUserOrThrow(Long userId) throws UserException{
        User user = userService.findUserById(userId);

        if(user!=null){
            return user;
        }
        else{
            throw new UserException("User not found with Id: "+userId);
        }
    }

    @Override
    public List<Issue> searchIssues(String title, String status, String priority, Long assigneeId) throws IssueException{

        List<Issue> searchIssues = issueRepository.searchIssues(title,status,priority,assigneeId);
        if(searchIssues!=null){
            return searchIssues;
        }

        throw new IssueException("No Issues found!");

    }

    @Override
    public List<User> getAssigneeForIssue(Long issueId) throws IssueException {
        return null;
    }

    @Override
    public Issue addUserToIssue(Long issueId, Long userId) throws UserException, IssueException {

        User user = userService.findUserById(userId);
        Optional<Issue> issue = getIssueById(issueId);

        if(issue.isEmpty()) throw new IssueException("Issue doesn't exist!");

        issue.get().setAssignee(user);
        notifyAssignee(user.getEmail(),"New Issue Assigned to You","New Issue Assigned To You");
        return issueRepository.save(issue.get());

    }

    @Override
    public Issue updateStatus(Long issueId, String status) throws IssueException {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        if(optionalIssue.isEmpty()){
            throw new IssueException("Issue not found!");
        }

        Issue issue = optionalIssue.get();
        issue.setStatus(status);

        return issueRepository.save(issue);

    }

    private void notifyAssignee(String email, String subject, String body){
        notificationServiceImpl.sendNotification(email,subject,body);
    }
}
