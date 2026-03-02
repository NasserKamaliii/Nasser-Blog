package com.nasser.blog.blog_platform.services;

import com.nasser.blog.blog_platform.domain.entities.Tag;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface TagService {
    List<Tag> gitAllTags();
    List<Tag> createTags(Set<String> tagNames);
    void deleteTag(UUID id);
    Tag getTagById(UUID id);
    List<Tag> getTagsByIds(Set<UUID> id);

}
