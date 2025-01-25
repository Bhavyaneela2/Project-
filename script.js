// Initial events data
let events = [
    { id: '1', title: 'Meeting A', start: '09:00', end: '10:30' },
    { id: '2', title: 'Workshop B', start: '10:00', end: '11:30' },
    { id: '3', title: 'Lunch Break', start: '12:00', end: '13:00' },
    { id: '4', title: 'Presentation C', start: '10:30', end: '12:00' }
  ];
  
  // Utility functions
  function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  function detectConflicts(events) {
    const conflicts = [];
    
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const event1 = events[i];
        const event2 = events[j];
        
        const start1 = parseTime(event1.start);
        const end1 = parseTime(event1.end);
        const start2 = parseTime(event2.start);
        const end2 = parseTime(event2.end);
        
        if (!(end1 <= start2 || end2 <= start1)) {
          conflicts.push({ event1, event2 });
        }
      }
    }
    
    return conflicts;
  }
  
  // DOM Elements
  const addEventForm = document.getElementById('addEventForm');
  const eventsListElement = document.getElementById('eventsList');
  const conflictsListElement = document.getElementById('conflictsList');
  
  // Render functions
  function renderEvents() {
    const sortedEvents = [...events].sort((a, b) => 
      parseTime(a.start) - parseTime(b.start)
    );
  
    eventsListElement.innerHTML = sortedEvents.map(event => `
      <div class="event-card">
        <div class="event-info">
          <h3>${event.title}</h3>
          <div class="event-time">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${event.start} - ${event.end}
          </div>
        </div>
        <button class="delete-btn" onclick="deleteEvent('${event.id}')">Delete</button>
      </div>
    `).join('');
  }
  
  function renderConflicts() {
    const conflicts = detectConflicts(events);
    
    if (conflicts.length === 0) {
      conflictsListElement.innerHTML = '';
      return;
    }
  
    conflictsListElement.innerHTML = `
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
        Conflicts Detected
      </h2>
      ${conflicts.map(conflict => `
        <div class="conflict-card">
          <p>Conflict between:</p>
          <ul>
            <li>${conflict.event1.title} (${conflict.event1.start} - ${conflict.event1.end})</li>
            <li>${conflict.event2.title} (${conflict.event2.start} - ${conflict.event2.end})</li>
          </ul>
        </div>
      `).join('')}
    `;
  }
  
  // Event handlers
  function addEvent(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
  
    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      start,
      end
    };
  
    events.push(newEvent);
    addEventForm.reset();
    
    renderEvents();
    renderConflicts();
  }
  
  function deleteEvent(id) {
    events = events.filter(event => event.id !== id);
    renderEvents();
    renderConflicts();
  }
  
  // Initialize
  addEventForm.addEventListener('submit', addEvent);
  renderEvents();
  renderConflicts();