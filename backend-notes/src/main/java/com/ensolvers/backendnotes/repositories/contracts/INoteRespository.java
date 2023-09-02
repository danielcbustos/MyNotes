package com.ensolvers.backendnotes.repositories.contracts;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.ensolvers.backendnotes.entities.Note;

public interface INoteRespository extends JpaRepository<Note, Long> {

    public List<Note> findByArchived(@Param("archived") Boolean archived);

}
