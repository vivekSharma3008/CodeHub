package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.IssueException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Comment;
import com.vishesh.SourceBox.model.Issue;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.repository.CommentRepository;
import com.vishesh.SourceBox.repository.IssueRepository;
import com.vishesh.SourceBox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Comment createComment(Long issueId, Long userId, String content) throws UserException, IssueException {

        Optional<Issue> issueOptional = issueRepository.findById(issueId);
        Optional<User> userOptional = userRepository.findById(userId);

        if(issueOptional.isEmpty()){
            throw new IssueException("Issue not found with id: "+issueId);
        }
        if(userOptional.isEmpty()){
            throw new UserException("User not found with id: "+userId);
        }

        Issue issue = issueOptional.get();
        User user = userOptional.get();

        Comment comment = new Comment();

        comment.setIssue(issue);
        comment.setUser(user);
        comment.setCreatedDateTime(LocalDateTime.now());
        comment.setContent(content);

        Comment savedComment = commentRepository.save(comment);

        issue.getComments().add(savedComment);

        return savedComment;
    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws UserException, IssueException {

        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        Optional<User> userOptional = userRepository.findById(userId);

        if(commentOptional.isEmpty()){
            throw new IssueException("Comment not found with id: "+commentId);
        }
        if(userOptional.isEmpty()){
            throw new UserException("User not found with id: "+userId);
        }

        Comment comment = commentOptional.get();
        User user = userOptional.get();

        if(comment.getUser().equals(user)){
            commentRepository.delete(comment);
        }
        else{
            throw new UserException("User: "+userId+" don't have permission to delete comment: "+commentId);
        }

    }

    @Override
    public List<Comment> findCommentsByIssueId(Long issueId) {

        return commentRepository.findByIssueId(issueId);

    }
}
