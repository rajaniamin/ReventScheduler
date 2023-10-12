package com.revent.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revent.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    void deleteTaskById(Long id);
    
    Optional<Task> findTaskById(Long id);
}
