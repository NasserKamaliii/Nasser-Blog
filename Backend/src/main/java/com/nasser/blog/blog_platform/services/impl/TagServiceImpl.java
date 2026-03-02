package com.nasser.blog.blog_platform.services.impl;

import com.nasser.blog.blog_platform.domain.entities.Tag;
import com.nasser.blog.blog_platform.repositories.TagRepository;
import com.nasser.blog.blog_platform.services.TagService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;
    @Override
    public List<Tag> gitAllTags() {
        return tagRepository.findAllWithPostCount();
    }

    @Transactional
    @Override
    public List<Tag> createTags(Set<String> tagNames) {
        List<Tag> existingTags = tagRepository.findByNameIn(tagNames);
        Set<String> existingTagsName = existingTags.stream().map(Tag::getName).collect(Collectors.toSet());
        Set<Tag> newTags = tagNames.stream().filter(name -> !existingTagsName.contains(name)).map(name -> Tag.builder()
                .posts(new HashSet<>())
                .name(name)
                .build()).collect(Collectors.toSet());
        List<Tag> savedTags = new ArrayList<>();
        if (!newTags.isEmpty()) {
            savedTags=tagRepository.saveAll(newTags);
        }
        savedTags.addAll(existingTags);
        return savedTags;
    }

    @Override
    public void deleteTag(UUID id) {
        tagRepository.findById(id).ifPresent(tag -> {
            if (!tag.getPosts().isEmpty()) {
                throw new IllegalStateException("Cannot delete tag which has posts");
            }
            tagRepository.deleteById(id);
        });
    }

    @Override
    public Tag getTagById(UUID id) {
        return tagRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("No tag found with id: " + id));
    }

    @Override
    public List<Tag> getTagsByIds(Set<UUID> ids) {
        List<Tag> allById = tagRepository.findAllById(ids);
        if (allById.size() != ids.size()) {
            throw new EntityNotFoundException("No tag found with ids: " + ids);
        }
        return allById;
    }
}
