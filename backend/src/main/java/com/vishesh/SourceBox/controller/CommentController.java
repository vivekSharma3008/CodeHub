package com.vishesh.SourceBox.controller;

import com.vishesh.SourceBox.exception.IssueException;
import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Comment;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.request.CommentRequest;
import com.vishesh.SourceBox.response.MessageResponse;
import com.vishesh.SourceBox.service.CommentService;
import com.vishesh.SourceBox.service.UserService;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private CommentService commentService;
    private UserService userService;

    @Autowired
    public CommentController(CommentService commentService, UserService userService){
        this.commentService = commentService;
        this.userService = userService;
    }

    @PostMapping()
    public ResponseEntity<Comment> createComment(
            @RequestBody CommentRequest req,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, IssueException, ProjectException {

        User user = userService.findUserProfileByJwt(jwt);
        Comment createComment = commentService.createComment(req.getIssueId(), user.getId(), req.getContent());
        return new ResponseEntity<>(createComment, HttpStatus.CREATED);

    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(
            @PathVariable Long commentId,
            @RequestHeader("Authorization") String jwt
    )  throws UserException, IssueException, ProjectException {

        User user = userService.findUserProfileByJwt(jwt);
        commentService.deleteComment(commentId, user.getId());
        MessageResponse res = new MessageResponse();
        res.setMessage("Comment deleted successfully.");
        return new ResponseEntity<>(res,HttpStatus.OK);

    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comment>> getCommentsByIssueId(
            @PathVariable Long issueId
    ){

        List<Comment> comments = commentService.findCommentsByIssueId(issueId);
        return new ResponseEntity<>(comments,HttpStatus.OK);

    }


}
