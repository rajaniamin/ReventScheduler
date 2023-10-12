package com.revent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revent.exception.TaskNotFoundException;
import com.revent.model.Task;
import com.revent.repo.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService{
	@Autowired
	private TaskRepository taskRepository;
	
     @Override
	public Task addTask(Task task) {
		return taskRepository.save(task);
	}
     @Override
	public List<Task> findAllTasks() {
		return taskRepository.findAll();
	}
     @Override
	public Task updateTask(Task task) {
		return taskRepository.save(task);
	}
     @Override
	public Task findTaskById(Long id) {
		return taskRepository.findTaskById(id)
				.orElseThrow(() -> new TaskNotFoundException("User by id " + id + " was not found"));
	}
     @Override
	public void deleteTask(Long id) {
		taskRepository.deleteTaskById(id);
	}
}
