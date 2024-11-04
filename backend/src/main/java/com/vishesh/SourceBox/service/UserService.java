package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.User;

public interface UserService {

    User findUserProfileByJwt(String jwt) throws UserException, ProjectException;

    User findUserByEmail(String email) throws UserException;

    User findUserById(Long userId) throws UserException;

    User updateUserProjectSize(User user, int number);

}
