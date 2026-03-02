package com.nasser.blog.blog_platform.mappers;

import com.nasser.blog.blog_platform.domain.PostStatus;
import com.nasser.blog.blog_platform.domain.dtos.TagDto;
import com.nasser.blog.blog_platform.domain.entities.Post;
import com.nasser.blog.blog_platform.domain.entities.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.Set;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TagMapper {
    @Mapping(target = "postCount",source = "posts",qualifiedByName = "calculatePostCount")
    TagDto toTagResponse(Tag tag);

    @Named("calculatePostCount")
    default Integer calculatePostCount(Set<Post> posts) {
        if (posts == null) {
            return 0;
        }
        return Math.toIntExact(posts.stream().filter(post -> PostStatus.PUBLISHED.equals(post.getStatus())).count());
    }
}
