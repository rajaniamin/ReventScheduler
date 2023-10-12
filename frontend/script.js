document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "http://localhost:8080";
  const newTaskInput = document.getElementById("new-task-input");
  const tasksContainer = document.getElementById("tasks");

  function createTaskElement(taskData) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const taskContentDiv = document.createElement("div");
    taskContentDiv.className = "content";

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.className = "text";
    taskInput.value = taskData.name;
    taskInput.readOnly = true;

    taskContentDiv.appendChild(taskInput);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.innerText = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerText = "Delete";

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    taskDiv.appendChild(taskContentDiv);
    taskDiv.appendChild(actionsDiv);

let isEditing = false;

editButton.addEventListener('click', () => {
  if (!isEditing) {
    isEditing = true;
    editButton.innerText = "Save";
    taskInput.removeAttribute("readonly");
    taskInput.focus();
  } else {
    isEditing = false;
    editButton.innerText = "Edit";
    taskInput.setAttribute("readonly", "readonly");
    updateTask(taskData.id, taskInput.value);
  }
});


    deleteButton.addEventListener('click', () => {
      tasksContainer.removeChild(taskDiv);
      deleteTask(taskData.id);
    });

    return taskDiv;
  }

  function addTask(task) {
    const taskDiv = createTaskElement(task);
    tasksContainer.appendChild(taskDiv);
  }

  function updateTask(taskId, newName) {
    return fetch(`${apiUrl}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: taskId, name: newName }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log('Task updated:', data);
        return data;
      })
      .catch(error => {
        console.error('Error updating task:', error);
        throw error;
      });
  }

  function deleteTask(taskId) {
    return fetch(`${apiUrl}/delete/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log('Task deleted from the server');
      })
      .catch(error => {
        console.error('Error deleting task from the server:', error);
      });
  }

  document.getElementById("new-task-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const newTaskName = newTaskInput.value;
    const newTask = { name: newTaskName };

    fetch(`${apiUrl}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        newTaskInput.value = "";
        addTask(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
});
