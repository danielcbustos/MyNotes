package com.ensolvers.backendnotes.services.implementations;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ensolvers.backendnotes.entities.Note;
import com.ensolvers.backendnotes.repositories.contracts.INoteRespository;
import com.ensolvers.backendnotes.services.contracts.INoteService;

@Service
public class NoteService implements INoteService {
    @Autowired
    private INoteRespository noteRepository;

    // this method allows you to list all notes
    @Override
    public ResponseEntity<List<Note>> findAll() {
        try {
            List<Note> notes = this.noteRepository.findAll();
            return new ResponseEntity<List<Note>>(notes, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println("error: " + e);
            return new ResponseEntity<List<Note>>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // this method allows you to create a note
    @Override
    public ResponseEntity<Note> create(Note note) {
        try {
            Note noteSaves = this.noteRepository.save(note);
            return new ResponseEntity<Note>(noteSaves, HttpStatus.CREATED);

        } catch (Exception e) {
            System.out.println("error: " + e);
            return new ResponseEntity<Note>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    // this method allows you to update a specific note
    @Override
    public ResponseEntity<Note> update(Long id, Note updatedNote) {
        try {
            Optional<Note> existingNote = this.noteRepository.findById(id);
            if (existingNote.isPresent()) {
                Note note = existingNote.get();
                note.setTitle(updatedNote.getTitle());
                note.setContent(updatedNote.getContent());
                note.setCategories(updatedNote.getCategories());
                note.setLastEdited(LocalDateTime.now());

                Note noteUpdated = this.noteRepository.save(note);
                return new ResponseEntity<Note>(noteUpdated, HttpStatus.OK);
            } else {
                return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<Note>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    // this method allows you to delete a specific note
    @Override
    public ResponseEntity<Object> delete(Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Note> noteToDelete = this.noteRepository.findById(id);
            if (noteToDelete.isPresent()) {
                Note note = noteToDelete.get();
                note.getCategories().clear();
                this.noteRepository.delete(note);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(response.put("msg", "id does not exist"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(response.put("msg", e), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // this method allows you to list all active notes
    @Override
    public ResponseEntity<List<Note>> findAllActive() {
        try {
            List<Note> activeNotes = this.noteRepository.findByArchived(false);
            return new ResponseEntity<List<Note>>(activeNotes, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println("error: " + e);
            return new ResponseEntity<List<Note>>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // this method allows you to list all archived notes
    @Override
    public ResponseEntity<List<Note>> findAllArchived() {
        try {
            List<Note> activeNotes = this.noteRepository.findByArchived(true);
            return new ResponseEntity<List<Note>>(activeNotes, HttpStatus.OK);

        } catch (Exception e) {
            System.out.println("error: " + e);
            return new ResponseEntity<List<Note>>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // this method allows you to Archive notes
    @Override
    public ResponseEntity<Object> archive(Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Note> noteToArchive = this.noteRepository.findById(id);

            if (noteToArchive.isPresent()) {
                Note note = noteToArchive.get();
                note.setArchived(true);
                noteRepository.save(note);

                response.put("msg", "Successfully Archived");

                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(response.put("msg", "id does not exist"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(response.put("msg", e), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // this method allows you to Unarchive notes
    @Override
    public ResponseEntity<Object> unarchive(Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Note> noteToUnarchive = this.noteRepository.findById(id);
            if (noteToUnarchive.isPresent()) {
                Note note = noteToUnarchive.get();
                note.setArchived(false);
                noteRepository.save(note);
                response.put("msg", "Successfully Unarchived");

                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(response.put("msg", "id does not exist"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(response.put("msg", e), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // this method allows you to list notes by id
    @Override
    public ResponseEntity<Note> findById(Long id) {
        try {
            Optional<Note> existingNote = this.noteRepository.findById(id);
            if (existingNote.isPresent()) {
                Note note = existingNote.get();
                return new ResponseEntity<Note>(note, HttpStatus.OK);
            } else {
                return new ResponseEntity<Note>(new Note(), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            System.out.println("error: " + e);
            return new ResponseEntity<Note>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
