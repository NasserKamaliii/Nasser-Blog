package com.nasser.blog.blog_platform.controllers;

import com.nasser.blog.blog_platform.domain.dtos.CreateTagRequest;
import com.nasser.blog.blog_platform.domain.dtos.TagDto;
import com.nasser.blog.blog_platform.domain.entities.Tag;
import com.nasser.blog.blog_platform.mappers.TagMapper;
import com.nasser.blog.blog_platform.services.TagService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tags")
@RequiredArgsConstructor
public class TagController {

    private static final Logger log = LoggerFactory.getLogger(TagController.class);
    private final TagService tagService;
    private final TagMapper tagMapper;

    @GetMapping()
    public ResponseEntity<List<TagDto>> getAllTags() {
        List<Tag> tags = tagService.gitAllTags();
        List <TagDto> tagsResponses = tags.stream().map(tagMapper::toTagResponse).toList();
        return ResponseEntity.ok(tagsResponses);
    }

    @PostMapping
    public ResponseEntity<List<TagDto>> createTags(@Valid @RequestBody CreateTagRequest createTagRequest) {
        log.trace("createTags {}", createTagRequest);
        log.debug("createTags {}", createTagRequest.getNames());
        List<Tag> savedTags=tagService.createTags(createTagRequest.getNames());
        List<TagDto> createdTagsResponses=savedTags.stream().map(tagMapper::toTagResponse).toList();
        return new ResponseEntity<>(
                createdTagsResponses, HttpStatus.CREATED
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable UUID id) {
        tagService.deleteTag(id);
        return ResponseEntity.noContent().build();
    }
}
