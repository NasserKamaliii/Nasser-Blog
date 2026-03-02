package com.nasser.blog.blog_platform.services;

import com.nasser.blog.blog_platform.domain.entities.User;

import java.util.UUID;

public interface UserService {
    User getUserById(UUID userId);
}
