package com.nasser.blog.blog_platform.domain.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTagRequest {
    @NotEmpty(message = "At least one tag name required")
    @Size(max = 10,message = "Maximum {max} tags allowed")
    private Set< @Size(min = 2,max = 30 ,message = "tags name must be between {min} and {max} characters") String> names;
}
