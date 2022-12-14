package com.examenv.examserver.service.impl;

import com.examenv.examserver.helper.UserFoundException;
import com.examenv.examserver.helper.UserNotFoundException;
import com.examenv.examserver.model.User;
import com.examenv.examserver.model.UserRole;
import com.examenv.examserver.repo.RoleRepository;
import com.examenv.examserver.repo.UserRepository;
import com.examenv.examserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    //creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
        User local = this.userRepository.findByUsername(user.getUsername());
        if (local != null){
            System.out.println("User is already there!!");
            throw new UserFoundException();
        }else {
            //user create
            for (UserRole ur: userRoles){
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }
        return local;
    }

    //Get user by username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }
}
