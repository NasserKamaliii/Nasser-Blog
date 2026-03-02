package com.nasser.blog.blog_platform.mappers;

import com.nasser.blog.blog_platform.domain.CreatePostRequest;
import com.nasser.blog.blog_platform.domain.UpdatePostRequest;
import com.nasser.blog.blog_platform.domain.dtos.CreatePostRequestDto;
import com.nasser.blog.blog_platform.domain.dtos.PostDto;
import com.nasser.blog.blog_platform.domain.dtos.UpdatePostRequestDto;
import com.nasser.blog.blog_platform.domain.entities.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {

    @Mapping(target = "author", source = "author")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "tags", source = "tags")
    PostDto toDto(Post post);

    CreatePostRequest toCreatePostRequestDto(CreatePostRequestDto  createPostRequestDto);
    UpdatePostRequest toUpdatePostRequestDto(UpdatePostRequestDto updatePostRequestDto);
}
