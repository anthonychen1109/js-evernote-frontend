document.addEventListener("DOMContentLoaded", () => {

  // displayNotes()
  displayNotes()

  // Edit Function
  function editPost(id) {
    const notesURL = `http://localhost:3000/api/v1/notes${id}`
    fetch()
  }

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

  function fetchNote(id) {
    return fetch(`http://localhost:3000/api/v1/notes/`)
    .then(response => response.json())
    .then(data => data[id])
  }

  function showBody(e){
    const toShow = e.target.dataset.id
    grabNotes()
      .then(notes => notes.forEach(note => {
        if(note.id == toShow){
          const div = document.getElementById('preview-window')
          const h = document.createElement('h2')
          h.innerText = note.title
          const p = document.createElement('p')
          div.innerText = ''
          p.innerText = note.body

          // CRUD Buttons
          const btnDiv = document.getElementById('btns-btns')
          const createBtnDiv = document.createElement('div')
          const editBtnDiv = document.createElement('div')
          const deleteBtnDiv = document.createElement('div')
          btnDiv.innerHTML = ''
          //Edit
          const editBtn = document.createElement('button')
          editBtn.innerText = 'Edit'
          editBtn.classList.add('crud-btn')
          editBtn.dataset.id = note.id
          editBtn.id = `edit-${note.id}`
          editBtn.addEventListener('click', editRender)
          //Create
          const createBtn = document.createElement('button')
          createBtn.innerText = 'Create'
          createBtn.classList.add('crud-btn')
          createBtn.dataset.id = note.id
          // createBtn.addEventListener('click', createPost)
          //Delete
          const deleteBtn = document.createElement('button')
          deleteBtn.innerText = 'Delete'
          deleteBtn.classList.add('crud-btn')
          deleteBtn.dataset.id = note.id
          // deleteBtn.addEventListener('click', deletePost)

          createBtnDiv.append(createBtn)
          editBtnDiv.append(editBtn)
          deleteBtnDiv.append(deleteBtn)
          btnDiv.append(createBtnDiv, deleteBtnDiv, editBtnDiv)
          div.append(h, p)
        }}
      ))
  }

  function editRender(e) {
    const id = e.target.dataset.id
    const div = document.getElementById('preview-window')
    div.innerText = ''
    const form = document.createElement('form')
    // title
    // body
    // submitbutton
    fetchNote(id)
      .then(note => {
        // h.innerText = note.title
        div.innerText = ''
        // p.innerText = note.body
        const titleField = document.createElement('input')
        titleField.setAttribute('type', 'text')
        titleField.setAttribute('value', note.title)
        const bodyField = document.createElement('input')
        bodyField.setAttribute('type', 'text')
        bodyField.setAttribute('value', note.body)
        const submitBtn = document.getElementById(`edit-${id}`)
        submitBtn.innerText = "Submit"
        submitBtn.addEventListener('click', editPost)
        form.appendChild(titleField)
        form.appendChild(bodyField)
        div.append(form)
      })
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
