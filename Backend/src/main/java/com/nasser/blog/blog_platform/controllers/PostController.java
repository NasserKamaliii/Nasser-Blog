package com.nasser.blog.blog_platform.controllers;

import com.nasser.blog.blog_platform.domain.CreatePostRequest;
import com.nasser.blog.blog_platform.domain.UpdatePostRequest;
import com.nasser.blog.blog_platform.domain.dtos.CreatePostRequestDto;
import com.nasser.blog.blog_platform.domain.dtos.PostDto;
import com.nasser.blog.blog_platform.domain.dtos.UpdatePostRequestDto;
import com.nasser.blog.blog_platform.domain.entities.Post;
import com.nasser.blog.blog_platform.domain.entities.User;
import com.nasser.blog.blog_platform.mappers.PostMapper;
import com.nasser.blog.blog_platform.services.PostService;
import com.nasser.blog.blog_platform.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) UUID tagId
    ) {
        List<Post> posts = postService.getPosts(categoryId, tagId);
        List<PostDto> postsDtos = posts.stream().map(postMapper::toDto).toList();

        return ResponseEntity.ok(postsDtos);
    }
    @GetMapping(path = "/drafts")
    public ResponseEntity<List<PostDto>> getAllDrafts(@RequestAttribute UUID userId) {
        User loggedUser = userService.getUserById(userId);
        List<Post> draftPosts = postService.getDraftPosts(loggedUser);
        List<PostDto> postDtos = draftPosts.stream().map(postMapper::toDto).toList();

        return ResponseEntity.ok(postDtos);
    }

    @PostMapping
    public ResponseEntity<PostDto> createPost(@RequestBody CreatePostRequestDto createPostRequest, @RequestAttribute UUID userId) {
        User loggedUser = userService.getUserById(userId);
        CreatePostRequest createPostRequestDto = postMapper.toCreatePostRequestDto(createPostRequest);
        Post post = postService.craetePost(loggedUser, createPostRequestDto);
        return new ResponseEntity<>(postMapper.toDto(post) , HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<PostDto> updatePost(@PathVariable UUID id, @RequestBody UpdatePostRequestDto updatePostRequest) {
        UpdatePostRequest updatePostRequestDto = postMapper.toUpdatePostRequestDto(updatePostRequest);
        Post UpdatedPost = postService.updatePost(id, updatePostRequestDto);
        PostDto updatedPostDto = postMapper.toDto(UpdatedPost);
        return ResponseEntity.ok(updatedPostDto);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<PostDto> getPost(@PathVariable UUID id) {
        Post post = postService.getPost(id);
        PostDto postDto = postMapper.toDto(post);
        return ResponseEntity.ok(postDto);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<PostDto> deletePost(@PathVariable UUID id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
