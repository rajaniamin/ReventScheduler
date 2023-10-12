# ReventScheduler
# Revent Scheduler Web App

## Introduction

The Revent Scheduler is a task management web application that makes it easy to create, view, and delete tasks. 

## Features

- **Add Task**: Easily add new tasks to your to-do list.

- **Edit Task**: Update task details as needed.

- **Remove Task**: Remove tasks from your list when they're completed or no longer needed.

## Setup

Follow these steps to set up the To-Do app locally:

### 1. Clone the Repository

- Use Git to clone this repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/your-todo-app.git

## API Endpoints

The Revent Scheduler application exposes the following API endpoints:

- Get all tasks:
   - URL: `GET http://localhost:8080/all`

- Get a task by ID:
   - URL: `GET http://localhost:8080/find/{id}`

- Add a new task:
   - URL: `POST http://localhost:8080/add`

- Update a task:
   - URL: `PUT http://localhost:8080/update`

- Delete a task by ID:
   - URL: `DELETE http://localhost:8080/delete/{id}`

These endpoints allow you to interact with the application programmatically.
Replace `http://localhost:8080` with the actual base URL of your deployed application if it's hosted elsewhere.



## Technology Stack

The project uses the following technologies:

- **Front-End**: HTML, CSS, JavaScript
- **Back-End**: Java with Spring Boot
- **Database**: H2 (In-memory database)
- **Dependency Management**: Maven
