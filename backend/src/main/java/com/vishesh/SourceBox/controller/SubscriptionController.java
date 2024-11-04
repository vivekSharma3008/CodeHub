package com.vishesh.SourceBox.controller;

import com.vishesh.SourceBox.domain.PlanType;
import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Subscription;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.service.SubscriptionService;
import com.vishesh.SourceBox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<Subscription> getUserSubscription(
            @RequestHeader("Authorization") String jwt
    ) throws Exception{

        User user = userService.findUserProfileByJwt(jwt);

        Subscription subscription = subscriptionService.getUsersSubscription(user.getId());

        if(subscription!=null){
            return new ResponseEntity<>(subscription, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PatchMapping("/upgrade")
    public ResponseEntity<Subscription> upgradeSubscription(
            @RequestHeader("Authorization") String jwt,
            @RequestParam PlanType planType
            ) throws UserException, ProjectException {

        User user = userService.findUserProfileByJwt(jwt);

        Subscription subscription = subscriptionService.upgradeSubscription(user.getId(),planType);

        return new ResponseEntity<>(subscription,HttpStatus.OK);

    }

}
