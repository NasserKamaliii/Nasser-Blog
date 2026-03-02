package com.nasser.blog.blog_platform.services.impl;

import com.nasser.blog.blog_platform.domain.entities.User;
import com.nasser.blog.blog_platform.repositories.UserRepository;
import com.nasser.blog.blog_platform.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Override
    public User getUserById(UUID userId) {
        return userRepository.findById(userId).orElseThrow(()->new EntityNotFoundException("User not found"));
    }
}
