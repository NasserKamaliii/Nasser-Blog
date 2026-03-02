package com.nasser.blog.blog_platform.domain.dtos;

import com.nasser.blog.blog_platform.domain.PostStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreatePostRequestDto {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 200,message = "Title must be between {max} and {min}")
    private String title;

    @NotBlank(message = "Content is required")
    @Size(min = 3, max = 200,message = "content must be between {max} and {min}")
    private String content;

    @NotNull(message = "Category is required")
    private UUID categoryId;

    @Builder.Default
    @Size(max = 8 ,message = "Maximum {max} tags allowed")
    private Set<UUID> tagIds = new HashSet<>();

    @NotNull
    PostStatus postStatus;
}
