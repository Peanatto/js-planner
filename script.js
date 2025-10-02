// Variable holding the modal for adding events
const modalWindow = document.getElementById('add-event-modal');

// This is the variable holding the calendar grid itself.
const calendarGrid = document.querySelector(".calendar-days-grid");

// Variables holding month view and week view
const monthView = document.getElementById('month-view');
const weekView = document.getElementById('week-view');

// Variables holding header grid and content grid
const weekHeaderGrid = document.querySelector('.day-headers-grid');
const weekContentGrid = document.querySelector('.week-content-grid');

// Variable holding time bar
const timeBar = document.querySelector(".time-bar");

// Variable holding button to go back to month view
const backToMonthBtn = document.getElementById('back-to-month-btn');

// Variable holding button to add event
const addEventBtn = document.getElementById('add-event-btn');

// Variable holding checkbox for "All-day"
const allDayBox = document.getElementById('all-day');

// Variables holding form, save button, and close button
const eventForm = document.getElementById('event-form');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Arrays holding necessary info
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const hours = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];

const dayDivs = [];

// Grabs the current date and puts it in the variable currDay
const currDay = new Date();

// Find the month in written form, then number, then year in number
const monthWritten = monthNames[currDay.getMonth()];
const month = currDay.getMonth();
const year = currDay.getFullYear();

// Sets the planner header to month and year
document.querySelector('.planner-header').textContent = monthWritten + ' ' + year;

// Set up the first day of the current month
const firstDay = new Date(year, month, 1);

// Find the day of the week of when the month starts
const firstDayOfWeek = firstDay.getDay();

// Find the amount of days in the current month
const finalDate = new Date(year, month + 1, 0).getDate();

let weekNumber = 1;

// Creates the layout of the calendar
for (let i = 1; i <= finalDate; i++) {

    const newDiv = document.createElement("div");
    newDiv.textContent = i;
    newDiv.classList.add('day');
    newDiv.dataset.week = weekNumber;

    if ((i + firstDayOfWeek) % 7 === 0) {
        // If the current day is a Saturday, we increment weekNumber to prepare for the next week.
        weekNumber++;
    }

    if (i === 1) {
        newDiv.style.gridColumnStart = firstDayOfWeek + 1;
    }

    dayDivs.push(newDiv);
    calendarGrid.appendChild(newDiv);

}

// Helper function to remove all children holding a same class, ex. day-content-column
const removeChildDivs = (parent, childClass) => {

    const parentDiv = document.querySelector(parent);

    // If the parent exists, continue
    if (parentDiv) {

        // Find the first instance of the child
        let divToRemove = parentDiv.querySelector(`.${childClass}`);

        // While the specific type of child exists, remove it from parent
        while (divToRemove) {

            parentDiv.removeChild(divToRemove);
            divToRemove = parentDiv.querySelector(`.${childClass}`);

        }

    }

}

// Function to set up time bar with hours and the day columns holding the events
const populateTimeBarAndDays = () => {

    // Create each hour as a new div and place it inside the time bar
    for (let i = 0; i <= 23; i++) {

        const newDiv = document.createElement("div");
        newDiv.classList.add("time-slot");
        newDiv.textContent = hours[i];
        timeBar.appendChild(newDiv);

    }

    // Create a read-only object holding the style of timeBar, used to set the width of corner-spacer.
    const computedStyleTB = window.getComputedStyle(timeBar);

    const cornerSpacer = document.querySelector(".corner-spacer");

    cornerSpacer.style.width = computedStyleTB.width;

    // Create the day columns that will hold the events to the right of the time bar
    for (let i = 0; i <= 6; i++) {

        const newCol = document.createElement("div");

        newCol.classList.add('day-content-column');

        for (let j = 0; j <= 23; j++) {

            const newHour = document.createElement("div");

            newHour.classList.add("hour-cell");

            newCol.appendChild(newHour);

        }

        weekContentGrid.appendChild(newCol);

    }

}

const showWeekView = (day) => {

    // Hides calendar grid and shows week
    monthView.classList.add('hidden');
    weekView.classList.remove('hidden');
    backToMonthBtn.classList.remove('hidden');

    // Resets the week view
    weekHeaderGrid.innerHTML = '';
    timeBar.innerHTML = '';
    removeChildDivs('.week-content-grid', 'day-content-column');

    const clickedDay = new Date(year, month, day);

    const sundayDateNumber = day - clickedDay.getDay();

    const sundayDate = new Date(year, month, sundayDateNumber);

    // Create and add .corner-spacer to the headers grid
    const cornerSpacerDiv = document.createElement('div');
    cornerSpacerDiv.classList.add('corner-spacer');
    weekHeaderGrid.appendChild(cornerSpacerDiv);

    for (let i = 0; i < 7; i++) {
        // Create a new day
        const currentDay = new Date(sundayDate);
        currentDay.setDate(sundayDate.getDate() + i);

        // Create the column for the new day
        const dayColumn = document.createElement('div');
        dayColumn.classList.add('week-day-column');

        // Create the name element for the day
        const dayName = document.createElement('div');
        dayName.textContent = dayNames[currentDay.getDay()];
        dayName.classList.add('week-day-name');

        // Create the number element for the day
        const dayNumber = document.createElement('div');
        dayNumber.textContent = currentDay.getDate();
        dayNumber.classList.add('week-day-number');

        // Append the name and number to the day's column
        dayColumn.appendChild(dayName);
        dayColumn.appendChild(dayNumber);

        // Append the column to the container
        weekHeaderGrid.appendChild(dayColumn);

    }

    // Call function to create time bar and day event columns
    populateTimeBarAndDays();

}

// Event listener that checks for a click on the calendar
calendarGrid.addEventListener('click', function(event) {

    if (event.target.classList.contains('day')) {

        showWeekView(event.target.textContent);

    }

});

// Event listener to create back-to-month-button functionality
backToMonthBtn.addEventListener('click', function() {
    weekView.classList.add('hidden');
    monthView.classList.remove('hidden');
    backToMonthBtn.classList.add('hidden');
});

// Event listener to show modal for adding events when "+" button is pressed
addEventBtn.addEventListener('click', function() {
    modalWindow.showModal();
});

// Event listener that checks if the All-Day box was checked, making elements appear or disappear
allDayBox.addEventListener('change', function(event) {
    const isChecked = event.target.checked;

    const startTimeRow = document.querySelector(".start-time-row");
    const endTimeRow = document.querySelector(".end-time-row");

    if (isChecked) {
        startTimeRow.classList.add('hidden');
        endTimeRow.classList.add('hidden');
    }
    else {
        startTimeRow.classList.remove('hidden');
        endTimeRow.classList.remove('hidden');
    }
});

// Event listener for cancel button that will close event modal
cancelBtn.addEventListener('click', function() {
    modalWindow.close();
});

// Event listener for form, checking if save button is pressed and saving event to local storage
eventForm.addEventListener('click', function(event) {

    if (event.target.id === 'save-btn') {
        const isAllDay = document.getElementById('all-day').checked;

        const newEvent = {
            type: document.querySelector('input[name="eventType"]:checked').value,
            title: document.getElementById('event-title').value, 
            isAllDay: isAllDay, 
            startTime: isAllDay ? null : document.getElementById('start-time').value, 
            endTime: isAllDay ? null : document.getElementById('end-time').value, 
            repeat: document.getElementById('repeat-select').value, 
            alert: document.getElementById('alert-select').value, 
            eventNotes: document.getElementById('event-notes').value
        }

        // Read from Local Storage and insert new event

        // This reads existing event string from Local Storage
        const storedEvents = localStorage.getItem('plannerEvents');

        // This parses found string into an array, or initializes an array if non-existent
        const events = JSON.parse(storedEvents) || [];

        // This adds the new event object into the array
        events.push(newEvent);

        // This converts the updated array back into a JSON string and 
        // sends it back to Local Storage, essentially saving it
        localStorage.setItem('plannerEvents', JSON.stringify(events));
    }

});

const renderEvents = () => {
    
    const storedEvents = localStorage.getItem('plannerEvents');
    const events = JSON.parse(storedEvents) || [];

    const eventsSize = events.length;

    for (let i = 0; i < eventsSize; i++) {

        const newMonthBarDiv = createElement('div');
        newMonthBarDiv.classList.add('month-event-bar');

    }

}