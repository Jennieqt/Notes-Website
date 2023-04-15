document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('note-form');
    const input = document.getElementById('note-input');
    const container = document.getElementById('notes-container');
  
    // Load notes from local storage
    loadNotes();
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      addNote(input.value);
      input.value = '';
    });
  
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        deleteNote(e.target.parentElement);
      }
    });
  
    function loadNotes() {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.forEach((note) => {
        createNoteElement(note);
      });
    }
  
    function addNote(note) {
      if (note.trim() === '') {
        alert('Please enter a note');
        return;
      }
  
      createNoteElement(note);
  
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    function createNoteElement(note) {
      const div = document.createElement('div');
      div.classList.add('note-card');
      div.innerHTML = `
        <p>${note}</p>
        <button class="delete-btn">Delete</button>
      `;
  
      container.appendChild(div);
    }
  
    function deleteNote(noteElement) {
      const note = noteElement.querySelector('p').textContent;
      noteElement.remove();
  
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      const updatedNotes = notes.filter((n) => n !== note);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  });
  