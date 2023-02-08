package com.cybage.service;

import com.cybage.dao.UserRepository;
import com.cybage.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    public UserDetailsServiceImpl() {
        System.out.println("\n---------- CTOR: " + getClass().getName() + " -----------\n");
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        System.out.println("\n------------ IN UserDetailsServiceImpl.loadUserByUsername ---------------\n");
        System.out.println("Email: " + email);

        User user = userRepo.findByEmail(email);

        System.out.println("User from loadUserByUsername: " + user);
        return new org.springframework.security.core.userdetails.
                User(user.getUserId().toString(), user.getPassword(), new ArrayList<GrantedAuthority>());
    }

    public UserDetails loadUserById(Integer id) throws UsernameNotFoundException {

        System.out.println("\n------------ IN UserDetailsServiceImpl.loadUserById ---------------\n");

        System.out.println("Id: " + id);

        User user = userRepo.findById(id).get();

        System.out.println("User from loadUserById: " + user);
        return new org.springframework.security.core.userdetails.User(user.getUserId().toString(), user.getPassword(), new ArrayList<GrantedAuthority>());
    }

}
