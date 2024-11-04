package com.vishesh.SourceBox.controller;

import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.atomic.LongAccumulator;

@RestController
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(
            @RequestHeader("Authorization") String jwt
    ) throws UserException, ProjectException {

        User user = userService.findUserProfileByJwt(jwt);
        if(user!=null){
            user.setPassword(null);
        }

        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);

    }

    @GetMapping("/api/users/{userId}")
    public ResponseEntity<User> findUserById(
            @PathVariable Long userId,
            @RequestHeader("Authorization") String jwt
            ) throws UserException{
        User user = userService.findUserById(userId);
        user.setPassword(null);

        return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
    }

}
