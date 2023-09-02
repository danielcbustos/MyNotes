package com.ensolvers.backendnotes.services.implementations;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ensolvers.backendnotes.entities.Category;
import com.ensolvers.backendnotes.entities.Note;
import com.ensolvers.backendnotes.repositories.contracts.ICategoryRepository;
import com.ensolvers.backendnotes.services.contracts.ICategoryService;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    // this method allows you to list all categories
    @Override
    public ResponseEntity<List<Category>> findAll() {
        try {
            List<Category> categories = this.categoryRepository.findAll();
            return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println("error: " + e);
            return new ResponseEntity<List<Category>>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // this method allows you to create a category
    @Override
    public ResponseEntity<Category> create(Category category) {
        try {
            Category existingCategory = categoryRepository.findByNameIgnoreCase(category.getName());

            if (existingCategory != null) {
                return new ResponseEntity<Category>(HttpStatus.CONFLICT);
            }

            Category categorySaves = this.categoryRepository.save(category);
            return new ResponseEntity<Category>(categorySaves, HttpStatus.CREATED);

        } catch (Exception e) {
            System.out.println("error: " + e);
            return new ResponseEntity<Category>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    // this method allows you to filter all categories
    @Override
    public ResponseEntity<Category> filterByName(String name) {
        try {
            Category category = this.categoryRepository.findByNameIgnoreCase(name);
            if (category != null) {
                return new ResponseEntity<Category>(category, HttpStatus.OK);
            } else {
                return new ResponseEntity<Category>(category, HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<Category>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // this method allows you to filter all categories with active notes

    @Override
    public ResponseEntity<Category> filterByNameAndActiveNote(String name) {
        try {
            Category category = this.categoryRepository.findByNameIgnoreCase(name);
            if (category != null) {
                List<Note> activeNotes = new ArrayList<>();
                for (Note note : category.getNotes()) {
                    if (!note.getArchived()) {
                        activeNotes.add(note);
                    }
                }
                category.setNotes(activeNotes);
                return new ResponseEntity<Category>(category, HttpStatus.OK);
            } else {
                return new ResponseEntity<Category>(category, HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<Category>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
