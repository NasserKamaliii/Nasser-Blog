package com.nasser.blog.blog_platform.services.impl;

import com.nasser.blog.blog_platform.domain.CreatePostRequest;
import com.nasser.blog.blog_platform.domain.PostStatus;
import com.nasser.blog.blog_platform.domain.UpdatePostRequest;
import com.nasser.blog.blog_platform.domain.entities.Category;
import com.nasser.blog.blog_platform.domain.entities.Post;
import com.nasser.blog.blog_platform.domain.entities.Tag;
import com.nasser.blog.blog_platform.domain.entities.User;
import com.nasser.blog.blog_platform.repositories.PostRepository;
import com.nasser.blog.blog_platform.services.CategoryService;
import com.nasser.blog.blog_platform.services.PostService;
import com.nasser.blog.blog_platform.services.TagService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final CategoryService categoryService;
    private final TagService tagService;
    public  final static int WORD_PER_MINUTE=200;

    @Override
    public Post getPost(UUID id) {
        return postRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> getPosts(UUID categoryId, UUID tagId) {

        if (categoryId != null || tagId != null) {
            Category category = categoryService.getCategoryById(categoryId);
            Tag tag = tagService.getTagById(tagId);
            return postRepository.findAllByStatusAndCategoryAndTagsContaining(PostStatus.PUBLISHED, category, tag);

        }

        if (categoryId != null) {
            Category category = categoryService.getCategoryById(categoryId);
            return postRepository.findAllByStatusAndCategory(PostStatus.PUBLISHED, category);

        }

        if (tagId != null) {
            Tag tag = tagService.getTagById(tagId);
            return  postRepository.findAllByStatusAndTagsContaining(PostStatus.PUBLISHED, tag);
        }
        return postRepository.findAllByStatus(PostStatus.PUBLISHED);
    }

    @Override
    public List<Post> getDraftPosts(User user) {
        return postRepository.findAllByAuthorAndStatus(user, PostStatus.DRAFT);
    }

    @Transactional
    @Override
    public Post craetePost(User user, CreatePostRequest createPostRequest) {
        Post post = new Post();
        post.setTitle(createPostRequest.getTitle());
        post.setContent(createPostRequest.getContent());
        post.setStatus(createPostRequest.getPostStatus());
        post.setAuthor(user);
        post.setReadingTime(calculateReadingTime(createPostRequest.getContent()));

        Category categoryById = categoryService.getCategoryById(createPostRequest.getCategoryId());
        post.setCategory(categoryById);

        Set<UUID> tagIds = createPostRequest.getTagIds();
        List<Tag> tags = tagService.getTagsByIds(tagIds);
        post.setTags(new HashSet<>(tags));

        return postRepository.save(post);
    }

    @Transactional
    @Override
    public Post updatePost(UUID id, UpdatePostRequest updatePostRequest) {
        Post existingPost = postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));
        existingPost.setTitle(updatePostRequest.getTitle());
        existingPost.setContent(updatePostRequest.getContent());
        existingPost.setStatus(updatePostRequest.getPostStatus());
        existingPost.setReadingTime(calculateReadingTime(updatePostRequest.getContent()));

        UUID categoryId = updatePostRequest.getCategoryId();

        if (!existingPost.getCategory().getId().equals(categoryId)) {
            Category category = categoryService.getCategoryById(categoryId);
            existingPost.setCategory(category);
        }
        Set<UUID> collect = existingPost.getTags().stream().map(Tag::getId).collect(Collectors.toSet());
        Set<UUID> tagIds = updatePostRequest.getTagIds();
        if (collect !=tagIds){
            List<Tag> tagsByIds = tagService.getTagsByIds(tagIds);
            existingPost.setTags(new HashSet<>(tagsByIds));
        }
        return postRepository.save(existingPost);
    }

    @Override
    public void deletePost(UUID id) {
        Post post = getPost(id);
        postRepository.delete(post);
    }

    private Integer calculateReadingTime(String content){
        if (content == null){
            return 0;
        }
        int wordCount = content.split(" ").length;
        return (int)Math.ceil((double) wordCount/WORD_PER_MINUTE);
    }

}
