package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.IssueException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Comment;
import com.vishesh.SourceBox.model.User;

import java.util.List;

public interface CommentService {

    Comment createComment(Long issueId, Long userId, String comment) throws UserException, IssueException;

    void deleteComment(Long commentId, Long userId) throws UserException, IssueException;

    List<Comment> findCommentsByIssueId(Long issueId);

}
