document.addEventListener("DOMContentLoaded", () => {

  grabNotes()

  // fetch notes
  function fetchNotes() {
    fetch("http://localhost:3000/api/v1/notes")
      .then(response => response.json())
      .then(data => console.log(data))
  }


  // fetch users
  function fetchUsers() {
    return fetch("http://localhost:3000/api/v1/users")
      .then(response => response.json())
      .then(data => data[0])
  }

  function grabNotes() {
    const userNotes = fetchUsers().then(notes => notes.notes)
    userNotes.then(notes => notes.forEach( note => {
      console.log(note.title)
    }))
  }

})
