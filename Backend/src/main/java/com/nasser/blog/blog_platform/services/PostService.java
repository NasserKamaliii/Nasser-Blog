package com.nasser.blog.blog_platform.services;

import com.nasser.blog.blog_platform.domain.CreatePostRequest;
import com.nasser.blog.blog_platform.domain.UpdatePostRequest;
import com.nasser.blog.blog_platform.domain.dtos.CreatePostRequestDto;
import com.nasser.blog.blog_platform.domain.entities.Post;
import com.nasser.blog.blog_platform.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface PostService {
    Post getPost(UUID id);
    List<Post> getPosts(UUID categoryId,UUID tagId);
    List<Post> getDraftPosts(User user);
    Post craetePost(User user, CreatePostRequest createPostRequest);
    Post updatePost(UUID id, UpdatePostRequest updatePostRequest);
    void deletePost(UUID id);
}
