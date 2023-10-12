document.addEventListener("DOMContentLoaded", function () {
  

  // Get a reference to the input field
  const newTaskInput = document.getElementById("new-task-input");

  // Get a reference to the element where you want to display the tasks
  const tasksContainer = document.getElementById("tasks");

  // Listen for the form submission event
  document.getElementById("new-task-form").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Get the value from the input field
      const newTaskName = newTaskInput.value;

      // Define the URL of your API endpoint
      const apiUrl = "http://localhost:8080/add"; 

      // Create the new task object
      const newTask = {
          name: newTaskName,
      };

      // Fetch data from the API using a POST request
      fetch(apiUrl, {
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
              // Process the data 
              console.log(data);

              // Clear the input field after adding the task
              newTaskInput.value = "";

              // Create a new task element and add it to the tasksContainer
              const taskDiv = document.createElement("div");
              taskDiv.className = "task";

              const taskContentDiv = document.createElement("div");
              taskContentDiv.className = "content";

              const taskInput = document.createElement("input");
              taskInput.type = "text";
              taskInput.className = "text";
              taskInput.value = data.name; // Use the data from the response
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

              tasksContainer.appendChild(taskDiv);
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  
  // Function to delete a task from the database and the webpage
  function deleteTask(id, taskElement) {
      // Define the URL of your API endpoint for deleting a task
      const deleteUrl = `http://localhost:8080/delete/${id}`; 

      // Send a DELETE request to the server
      fetch(deleteUrl, {
          method: "DELETE",
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }

              // Remove the task element from the webpage
              taskElement.remove();
          })
          .catch((error) => {
              console.error("Error deleting task:", error);
          });
  }

  // Iterate through existing tasks and attach delete event listeners
  const existingTasks = document.querySelectorAll(".task");
  existingTasks.forEach((taskDiv) => {
      const taskId = taskDiv.getAttribute("data-task-id"); // Assuming you have a data attribute for task ID
      taskDiv.querySelector(".delete").addEventListener("click", function () {
          deleteTask(taskId, taskDiv);
      });
  });

});




document.addEventListener("DOMContentLoaded", function () {
  // ...

  // Function to edit a task
  function editTask(taskInput, taskDiv) {
      taskInput.readOnly = false;
      taskInput.focus(); // Focus on the input for editing

      // Hide the "Edit" button and show the "Save" button
      taskDiv.querySelector(".edit").style.display = "none";
      taskDiv.querySelector(".save").style.display = "block";
  }

  // Function to save changes to a task
  function saveTask(taskInput, taskId, taskDiv) {
      taskInput.readOnly = true;

      // Get the updated task description
      const updatedTaskDescription = taskInput.value;

      // Define the URL of your API endpoint for updating a task
      const updateUrl = `http://localhost:8080/update`; 

      // Create the updated task object
      const updatedTask = {
          id: taskId,
          name: updatedTaskDescription,
      };

      // Fetch data from the API using a PUT request
      fetch(updateUrl, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }

              // Show the "Edit" button and hide the "Save" button
              taskDiv.querySelector(".edit").style.display = "block";
              taskDiv.querySelector(".save").style.display = "none";
          })
          .catch((error) => {
              console.error("Error updating task:", error);
          });
  }

  // Iterate through existing tasks and attach edit and save event listeners
  const existingTasks = document.querySelectorAll(".task");
  existingTasks.forEach((taskDiv) => {
      const taskInput = taskDiv.querySelector(".text");
      const taskId = taskDiv.getAttribute("data-task-id");

      taskDiv.querySelector(".edit").addEventListener("click", function () {
          editTask(taskInput, taskDiv);
      });

      taskDiv.querySelector(".save").addEventListener("click", function () {
          saveTask(taskInput, taskId, taskDiv);
      });
  });

  // ...
});
