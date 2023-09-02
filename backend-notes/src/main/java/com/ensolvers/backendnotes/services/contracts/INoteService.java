package com.ensolvers.backendnotes.services.contracts;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.ensolvers.backendnotes.entities.Note;

public interface INoteService {
    public ResponseEntity<List<Note>> findAll();

    public ResponseEntity<Note> create(Note note);

    public ResponseEntity<Note> update(Long id, Note updatedNote);

    public ResponseEntity<Object> delete(Long id);

    public ResponseEntity<List<Note>> findAllActive();

    public ResponseEntity<List<Note>> findAllArchived();

    public ResponseEntity<Object> archive(Long id);

    public ResponseEntity<Object> unarchive(Long id);

    public ResponseEntity<Note> findById(Long id);

}
