package com.nasser.blog.blog_platform.controllers;

import com.nasser.blog.blog_platform.domain.dtos.CategoryDto;
import com.nasser.blog.blog_platform.domain.dtos.CreateCategoryRequestDto;
import com.nasser.blog.blog_platform.domain.entities.Category;
import com.nasser.blog.blog_platform.mappers.CategoryMapper;
import com.nasser.blog.blog_platform.services.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> listCategory() {
        List<CategoryDto> categories = categoryService.listCategories()
                .stream().map(categoryMapper::toDto)
                .toList();
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CreateCategoryRequestDto createCategoryRequestDto) {
        Category categoryToCreate = categoryMapper.toEntity(createCategoryRequestDto);
        Category savedCategory = categoryService.creatCategory(categoryToCreate);
        return new ResponseEntity<>(
                categoryMapper.toDto(savedCategory),
                HttpStatus.CREATED
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(
                HttpStatus.NO_CONTENT
        );
    }
}
