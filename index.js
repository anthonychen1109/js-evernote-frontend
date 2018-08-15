document.addEventListener("DOMContentLoaded", () => {

  // displayNotes()
  displayNotes()

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
    return fetchUsers().then(notes => notes.notes)

  }

  function showBody(e){
    const toShow = e.target.dataset.id
    grabNotes()
      .then(notes => notes.forEach(note => {
        if(note.id == toShow){
          const div = document.getElementById('preview-window')
          const p = document.createElement('p')
          div.innerText = ''
          p.innerText = note.body
          div.append(p)
        }}
      ))
  }

  function displayNotes(){
    grabNotes()
    .then(notes => notes.forEach( note => {
        const previewBtn = document.createElement('button')
        previewBtn.innerText = "PREVIEW"
        previewBtn.dataset.id = note.id
        previewBtn.addEventListener('click', showBody)
        const li = document.createElement('li')
        const div = document.getElementById('notes-container')
        li.innerText = note.title
        div.append(li, previewBtn)
    }))
    }


})
