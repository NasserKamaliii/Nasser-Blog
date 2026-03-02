package com.nasser.blog.blog_platform.repositories;

import com.nasser.blog.blog_platform.domain.PostStatus;
import com.nasser.blog.blog_platform.domain.entities.Category;
import com.nasser.blog.blog_platform.domain.entities.Post;
import com.nasser.blog.blog_platform.domain.entities.Tag;
import com.nasser.blog.blog_platform.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findAllByStatusAndCategoryAndTagsContaining(PostStatus postStatus, Category category, Tag tag);
    List<Post> findAllByStatusAndCategory(PostStatus postStatus, Category category);
    List<Post> findAllByStatusAndTagsContaining(PostStatus postStatus, Tag tag);
    List<Post> findAllByStatus(PostStatus postStatus);
    List<Post> findAllByAuthorAndStatus(User user, PostStatus postStatus);
}
