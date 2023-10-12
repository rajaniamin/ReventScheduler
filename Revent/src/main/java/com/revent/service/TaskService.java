package com.revent.service;

import java.util.List;

import com.revent.exception.TaskNotFoundException;
import com.revent.model.Task;

public interface TaskService {
	public Task addTask(Task task) ;

	public List<Task> findAllTasks() ;
	public Task updateTask(Task task) ;
	public Task findTaskById(Long id) ;

	public void deleteTask(Long id) ;
}
