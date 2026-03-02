package com.nasser.blog.blog_platform.domain.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCategoryRequestDto {
    @NotBlank(message = "Category name is required")
    @Size(min=2,max=50,message = "category name must be between {min} and {max}")
    private String name;
}
