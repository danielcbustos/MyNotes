package com.ensolvers.backendnotes.repositories.contracts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.ensolvers.backendnotes.entities.Category;

public interface ICategoryRepository extends JpaRepository<Category, Long> {

    public Category findByNameIgnoreCase(@Param("name") String name);
}
