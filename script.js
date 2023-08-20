// Define a function 'logColors' to call the function later
var logColors = function () {
    // Get the current hour using 'dayjs' library with is getting the hour of the day 'hour'
    var nowHour = dayjs().hour();
    
    // Get all elements with IDs starting with 'hour-' and store them in 'plannerHours' the (^)is start with
    var plannerHours = $('[id^="hour-"]');
    
    // repeat over each element in 'plannerHours'
    plannerHours.each(function () {
      // Get the ID attribute of the current element
      var id = $(this).attr("id");
      
      // Extract the number at the end of the ID by splitting at the '-' character
      var endingNumber = id.split("-")[1];
  
      // Compare the extracted number with 'nowHour' and apply classes based on the comparison
      if (parseInt(endingNumber) > nowHour) {
        $(this).addClass("future");   // Add the 'future' class to the current element green
      } else if (parseInt(endingNumber) === nowHour) {
        $(this).addClass("present");  // Add the 'present' class to the current element red
      } else if (parseInt(endingNumber) < nowHour) {
        $(this).addClass("past");     // Add the 'past' class to the current element gray
      }
    });
  };
  
  // Call the 'logColors' function line 2
  logColors();
  
    
  // Call the 'updateLiveTime' function to set the initial time
  updateLiveTime();
  
  // Call the 'updateLiveTime' function every 1000ms (1 second) 
  setInterval(updateLiveTime, 1000);
  
  
  // Define a function to save tasks to localStorage
function saveTasksToLocalStorage() {
    // Retrieve existing tasks from localStorage or initialize an empty array if it doesn't exist 
    var existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // repeat over each element with class 'time-block'
    $(".time-block").each(function () {
      // Get the ID of the current element and store it in 'timerText'
      var timerText = $(this).attr("id");
  
      // Get the value of the child element with class 'description' (task) and store it in 'fillerTask'
      var fillerTask = $(this).children(".description").val().trim();
  
      // Find the index of the task in 'existingTasks' based on the ID
      var taskIndex = existingTasks.findIndex(function (item) {
        return item.id === timerText;
      });
  
      // If the task with the ID exists, update the task in 'existingTasks'
      if (taskIndex !== -1) {
        existingTasks[taskIndex].task = fillerTask;
      } else {
        // If the task with the ID does not exist, add a new task to 'existingTasks'
        existingTasks.push({ id: timerText, task: fillerTask });
      }
    });
  
    // Save the updated tasks array to localStorage
    localStorage.setItem("tasks", JSON.stringify(existingTasks));
  }
  
  // Add a click event listener to all elements with the class 'saveBtn'
  $(".saveBtn").on("click", function () {
    // Call the function to save tasks to localStorage
    saveTasksToLocalStorage();
  });
  
  // Execute a function when the DOM is fully loaded
  $(function () {
    // Retrieve tasks from localStorage
    var existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // Iterate over each element with class 'time-block'
    $(".time-block").each(function () {
      // Get the ID of the current element and store it in 'timerText'
      var timerText = $(this).attr("id");
  
      // Find the corresponding task from the existing tasks array based on the ID
      var task = existingTasks.find(function (item) {
        return item.id === timerText;
      });
  
      // If a corresponding task is found, set the value of the child element with class 'description' to the task value
      if (task) {
        $(this).children(".description").val(task.task);
      }
    });
  });
  
  
  // Define a function 'updateLiveTime' to run later
  function updateLiveTime() {
    // Get the current time in the specified format and store it in 'currentTime' paste on page in header
    var currentTime = dayjs().format("h:mm:ss A  MMM /D /YYYY");
    
    // Update the content of the element with ID 'currentDay' to 'currentTime'
    document.getElementById("currentDay").innerHTML = currentTime;
  }

  $("#clearBtn").on("click", function () {
    // Clear the local storage
    localStorage.clear();
    // Refresh the page to reflect the cleared storage
    location.reload();
  });
