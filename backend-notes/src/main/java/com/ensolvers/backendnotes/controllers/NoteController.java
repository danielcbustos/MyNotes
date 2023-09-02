package com.ensolvers.backendnotes.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ensolvers.backendnotes.entities.Note;
import com.ensolvers.backendnotes.services.contracts.INoteService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private INoteService noteService;

    @GetMapping("/list")
    private ResponseEntity<List<Note>> getAllNotes() {
        return this.noteService.findAll();
    }

    @PostMapping("/create")
    private ResponseEntity<Note> createNote(@RequestBody Note note) {
        return this.noteService.create(note);
    }

    @PutMapping("/update/{id}")
    private ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note updatedNote) {
        return this.noteService.update(id, updatedNote);
    }

    @DeleteMapping("/delete/{id}")
    private ResponseEntity<Object> deleteNote(@PathVariable Long id) {
        return this.noteService.delete(id);
    }

    @GetMapping("/activeList")
    private ResponseEntity<List<Note>> getAllActiveNotes() {
        return this.noteService.findAllActive();
    }

    @GetMapping("/archivedList")
    private ResponseEntity<List<Note>> getAllArchivedNotes() {
        return this.noteService.findAllArchived();
    }

    @PutMapping("/archive/{id}")
    private ResponseEntity<Object> archiveNote(@PathVariable Long id) {
        return this.noteService.archive(id);
    }

    @PutMapping("/unarchive/{id}")
    private ResponseEntity<Object> unarchiveNote(@PathVariable Long id) {
        return this.noteService.unarchive(id);
    }

    @GetMapping("/list/{id}")
    private ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        return this.noteService.findById(id);
    }
}
