// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
/*$(document).ready(function () {
    var NowMoment = moment().format("MMMM Do YYYY");
  var displayDate = document.querySelector("currentDay");
  displayDate.innerHTML = NowMoment;
  var currentHour = moment().format("HH");
  console.log(timeBlock)
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
  
    $(".time-div").each(function () {
      var timeDiv = $(this).attr("id").split("-")[1];
      
      if (currentHour == timeDiv) {
        $(this).addClass("present");
        $(this).children(".description").addClass("white-text");
      } else if (currentHour < timeDiv) {
        $(this).removeClass("present");
        $(this).addClass("future");
      } else if (currentHour > timeDiv) {
        $(this).removeClass("future");
        $(this).addClass("past");
      }
    });
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  }); */

  
 /* document.addEventListener("DOMContentLoaded", function () {
    // Moment.js code for current date and time
    var nowMoment = moment().format("MMMM Do YYYY");
    var displayDate = document.getElementById("currentDay");
    displayDate.innerHTML = nowMoment;
  
    var currentHour = moment().format("HH");
  
    // Button function to clear local storage and clear contents
    /*var clearFieldsBtn = document.getElementById("clearFieldsBtn");
    clearFieldsBtn.addEventListener("click", function (event) {
      event.preventDefault();
      var textareas = document.querySelectorAll("textarea");
      textareas.forEach(function (textarea) {
        textarea.value = "";
      });
      localStorage.clear();
    });
  
    // Grabs hour from each time slot and compares it to the actual time
    var timeDivs = document.querySelectorAll(".time-block");
    timeDivs.forEach(function (timeBlock) {
      var timeDivId = parseInt(timeBlock.getAttribute("id").split("-")[1]);
      var description = timeBlock.querySelector(".description");
  
      if (currentHour == timeId) {
        timeBlock.classList.add("present");
        /*description.classList.add("white-text");
      } else if (currentHour < timeDivId) {
        timeBlock.classList.remove("present");
        timeBlock.classList.add("future");
      } else {
        timeBlock.classList.remove("future");
        timeBlock.classList.add("past");
      }
    });
  
    // Grabs values from time and value divs and saves them to local storage
    var saveBtns = document.querySelectorAll(".saveBtn");
    saveBtns.forEach(function (saveBtn) {
      saveBtn.addEventListener("click", function (event) {
        event.preventDefault();
        var value = this.previousElementSibling.value;
        var time = this.parentElement.getAttribute("id").split("-")[1];
        localStorage.setItem(time, value);
      });
    });
  
    // Retrieves items from local storage and sets them in proper places
    var timeBlocks = document.querySelectorAll(".time-block");
    timeBlocks.forEach(function (timeBlock) {
      var timeId = timeBlock.parentElement.getAttribute("id").split("-")[1];
      var storedValue = localStorage.getItem(timeId);
      if (storedValue) {
        timeBlock.value = storedValue;
      }
    });*/
 
// Define a function 'logColors'
var logColors = function () {
    // Get the current hour using 'dayjs' library
    var nowHour = dayjs().hour();
    
    // Get all elements with IDs starting with 'hour-' and store them in 'plannerHours'
    var plannerHours = $('[id^="hour-"]');
    
    // Iterate over each element in 'plannerHours'
    plannerHours.each(function () {
      // Get the ID attribute of the current element
      const id = $(this).attr("id");
      
      // Extract the number at the end of the ID by splitting at the '-' character
      const endingNumber = id.split("-")[1];
  
      // Compare the extracted number with 'nowHour' and apply classes based on the comparison
      if (parseInt(endingNumber) > nowHour) {
        $(this).addClass("future");   // Add the 'future' class to the current element
      } else if (parseInt(endingNumber) === nowHour) {
        $(this).addClass("present");  // Add the 'present' class to the current element
      } else if (parseInt(endingNumber) < nowHour) {
        $(this).addClass("past");     // Add the 'past' class to the current element
      }
    });
  };
  
  
  logColors();
  
  
  console.log(logColors())

var tasks = [];

$(".saveBtn").on("click", function () {
  
  var textSlots = $(this).parent().attr("id");


  var fillerTask = $(this).siblings(".description").val().trim();


  var existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

 
  existingTasks.push({ id: textSlots, task: fillerTask });

  localStorage.setItem("tasks", JSON.stringify(existingTasks));
});


$(function () {
 
  var existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  $(".time-block").each(function () {
    
    var timerText = $(this).attr("id");

    
    var task = existingTasks.find(function (item) {
      return item.id === timerText;
    });


    if (task) {
      $(this).children(".description").val(task.task);
    }
  });
});

  
  // Define a function 'updateLiveTime'
  function updateLiveTime() {
    // Get the current time in the specified format and store it in 'currentTime'
    var currentTime = dayjs().format("h:mm:ss A  MMM /D /YYYY");
    
    // Update the content of the element with ID 'currentDay' to 'currentTime'
    document.getElementById("currentDay").innerHTML = currentTime;
  }
  
  // Call the 'updateLiveTime' function to set the initial time
  updateLiveTime();
  
  // Call the 'updateLiveTime' function every 1000ms (1 second) using setInterval to update the live time
  setInterval(updateLiveTime, 1000);
  