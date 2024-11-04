package com.vishesh.SourceBox.controller;

import com.vishesh.SourceBox.config.JwtProvider;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.Subscription;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.repository.SubscriptionRepository;
import com.vishesh.SourceBox.repository.UserRepository;
import com.vishesh.SourceBox.request.LoginRequest;
import com.vishesh.SourceBox.response.AuthResponse;
import com.vishesh.SourceBox.service.CustomUserDetailsImpl;
import com.vishesh.SourceBox.service.SubscriptionService;
import com.vishesh.SourceBox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsImpl customUserDetails;

    @Autowired
    private UserService userService;

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse>createUserHandler(@RequestBody User user) throws Exception{

        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String role = user.getRole();

        User isUserExist = userRepository.findByEmail(email);

        if(isUserExist!=null){
            throw new UserException("Email already exist with another Account!");
        }

        User createdUser = new User();  
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setEmail(email);
        createdUser.setFullName(fullName);
        createdUser.setRole(role);

        User savedUser = userRepository.save(createdUser);

        Subscription subscription = subscriptionService.createSubscription(savedUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = JwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse();
        res.setMessage("Register Success");
        res.setJwt(jwt);

        return new ResponseEntity<AuthResponse>(res, HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest){

        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = JwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse();
        res.setMessage("Login Success");
        res.setJwt(jwt);

        return new ResponseEntity<AuthResponse>(res,HttpStatus.OK);

    }

    private Authentication authenticate(String username, String password) {

        UserDetails userDetails = customUserDetails.loadUserByUsername(username);
        if(userDetails==null){
            throw new BadCredentialsException("Invalid username or password!");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password or password!");
        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

    }

}
