package com.vishesh.SourceBox.controller;

import com.vishesh.SourceBox.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("")
    public ResponseEntity<ApiResponse> homeController(){
        ApiResponse res = new ApiResponse("Welcome to User Service",true);
        return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);
    }

}
