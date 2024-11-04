package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.config.JwtProvider;
import com.vishesh.SourceBox.exception.ProjectException;
import com.vishesh.SourceBox.exception.UserException;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException, ProjectException {
         String email = JwtProvider.getEmailFromJwtToken(jwt);

         User user = userRepository.findByEmail(email);
         userRepository.save(user);

         if(user==null){
             throw new UserException("User not exist with email "+email);
         }
            return user;

    }

    @Override
    public User findUserByEmail(String email) throws UserException {
        User user = userRepository.findByEmail(email);
        if(user==null){
            throw new UserException("User with email: "+email+" not found!");
        }
        return user;
    }

    @Override
    public User findUserById(Long userId) throws UserException {

        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isEmpty()){
            throw new UserException("User not found with Id: "+userId);
        }
        return optionalUser.get();

    }

    @Override
    public User updateUserProjectSize(User user, int number) {
        user.setProjectSize(user.getProjectSize()+number);
        if(user.getProjectSize()==-1){
            return user;
        }
        return userRepository.save(user);
    }
}
