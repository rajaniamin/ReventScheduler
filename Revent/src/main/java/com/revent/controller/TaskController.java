package com.revent.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revent.model.Task;
import com.revent.service.TaskService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class TaskController {

	@Autowired
	private TaskService taskService;

	

	@GetMapping("/all")
	public ResponseEntity<@Valid List<Task>> getAllTasks() {
		List<Task> tasks = taskService.findAllTasks();
		return new ResponseEntity<>(tasks, HttpStatus.OK);

	}

	@GetMapping("/find/{id}")
	public ResponseEntity<Task> getTaskById(@Valid @PathVariable("id") Long id) {
		Task task = taskService.findTaskById(id);
		return new ResponseEntity<>(task, HttpStatus.OK);
	}

	@PostMapping("/add")
	public ResponseEntity<Task> addTask(@Valid @RequestBody Task task) {
		Task newTask = taskService.addTask(task);
		return new ResponseEntity<>(newTask, HttpStatus.CREATED);
	}

	@PutMapping("/update")
	public ResponseEntity<Task> updateEmployee(@Valid @RequestBody Task task) {
		Task updateTask = taskService.updateTask(task);
		return new ResponseEntity<>(updateTask, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Task> deleteTask(@Valid @PathVariable("id") Long id) {
		taskService.deleteTask(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
