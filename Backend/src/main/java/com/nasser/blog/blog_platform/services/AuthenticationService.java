package com.nasser.blog.blog_platform.services;

import com.nasser.blog.blog_platform.domain.entities.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthenticationService {

    UserDetails authenticate(String username, String password);
    String generateToken(UserDetails userDetails);
    UserDetails validateToken(String token);
    User register(User user);
}
