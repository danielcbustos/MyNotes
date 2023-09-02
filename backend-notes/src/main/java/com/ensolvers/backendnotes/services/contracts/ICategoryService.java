package com.ensolvers.backendnotes.services.contracts;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.ensolvers.backendnotes.entities.Category;

public interface ICategoryService {
    public ResponseEntity<List<Category>> findAll();

    public ResponseEntity<Category> create(Category category);

    public ResponseEntity<Category> filterByName(String name);

    public ResponseEntity<Category> filterByNameAndActiveNote(String name);
}
