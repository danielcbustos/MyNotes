package com.ensolvers.backendnotes.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ensolvers.backendnotes.entities.Category;
import com.ensolvers.backendnotes.services.contracts.ICategoryService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    @GetMapping("/list")
    private ResponseEntity<List<Category>> getAllCategories() {
        return this.categoryService.findAll();
    }

    @PostMapping("/create")
    private ResponseEntity<Category> createCategory(@RequestBody Category category) {
        return this.categoryService.create(category);
    }

    @GetMapping("/filterByCategory")
    private ResponseEntity<Category> filterByCategory(@RequestParam("name") String name) {
        return this.categoryService.filterByName(name);
    }

    @GetMapping("/filterByCategoryActive")
    private ResponseEntity<Category> filterByCategoryAndActiveNote(@RequestParam("name") String name) {
        return this.categoryService.filterByNameAndActiveNote(name);
    }

}
