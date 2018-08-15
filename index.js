document.addEventListener("DOMContentLoaded", () => {

  // console.log(grabNotes().then(n => n.length));

  // displayNotes()
  displayNotes()



  // Edit Function
  function editPost(submitObj) {
    const notesURL = `http://localhost:3000/api/v1/notes/${submitObj.id}`
    fetch(notesURL, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submitObj)
    })
    showBody()
  }

  // Delete Function

  function deletePost(e) {
    const id = e.target.dataset.id
    const notesURL = `http://localhost:3000/api/v1/notes/${id}`
    fetch(notesURL, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    document.getElementById('preview-window').innerText = ''
    showBody()

  }

  // Create Function
  function createPost(submitObj){
    console.log(submitObj)
    const notesURL = `http://localhost:3000/api/v1/notes/`
    fetch(notesURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submitObj)
    })
    showBody()
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
    .then(data => data[id - 1])
  }

  function grabEventId(e){
    const showID = e.target.dataset.id
    return showBody(showID)
  }

  function showBody(grabbedID){
    grabNotes()
      .then(notes => notes.forEach(note => {
        if(note.id == grabbedID){
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
          createBtn.id = `create-${note.id}`
          createBtn.addEventListener('click', createRender)
          //Delete
          const deleteBtn = document.createElement('button')
          deleteBtn.innerText = 'Delete'
          deleteBtn.classList.add('crud-btn')
          deleteBtn.dataset.id = note.id
          deleteBtn.addEventListener('click', deletePost)

          createBtnDiv.append(createBtn)
          editBtnDiv.append(editBtn)
          deleteBtnDiv.append(deleteBtn)
          btnDiv.append(createBtnDiv, deleteBtnDiv, editBtnDiv)
          div.append(h, p)
        }}
      ))
      displayNotes()
  }

  function createRender(e){

    const id = e.target.dataset.id
    const div = document.getElementById('preview-window')
    div.innerText = ''
    const form = document.createElement('form')
    // title
    // body
    // submitbutton
            // h.innerText = note.title
        div.innerText = ''
        // p.innerText = note.body
        const titleField = document.createElement('input')
        const titleDiv = document.createElement('div')
        titleDiv.classList.add('form-center')
        titleField.classList.add('form')
        const bodyField = document.createElement('textarea')
        const bodyDiv = document.createElement('div')
        bodyDiv.classList.add('form-center')
        bodyField.rows = '8'
        bodyField.cols = '40'
        bodyField.classList.add('form')
        const submitBtn = document.getElementById(`create-${id}`)
        submitBtn.innerText = "Submit"
        submitBtn.addEventListener('click', () => {
        fetchUsers().then(n =>{
          // const userOb = {id: n.id, name: n.name }
          const submitObj = {title: titleField.value, body: bodyField.value, user_id: n.id }
          createPost(submitObj)
          div.innerHTML = ''
          showBody(id)
        })})
        titleDiv.append(titleField)
        bodyDiv.append(bodyField)
        form.appendChild(titleDiv)
        form.appendChild(bodyDiv)
        div.append(form)
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
        const titleDiv = document.createElement('div')
        titleDiv.classList.add('form-center')
        titleField.value = note.title
        titleField.classList.add('form')
        const bodyField = document.createElement('textarea')
        const bodyDiv = document.createElement('div')
        bodyDiv.classList.add('form-center')
        bodyField.rows = '8'
        bodyField.cols = '40'
        bodyField.classList.add('form')
        bodyField.value = note.body
        const submitBtn = document.getElementById(`edit-${id}`)
        submitBtn.innerText = "Submit"
        submitBtn.addEventListener('click', () => {
          const submitObj = {id: id, title: titleField.value, body: bodyField.value }
          editPost(submitObj)
          showBody(id)
          div.innerHTML = ''
        })
        titleDiv.append(titleField)
        bodyDiv.append(bodyField)
        form.appendChild(titleDiv)
        form.appendChild(bodyDiv)
        div.append(form)
      })
  }

  function displayNotes(){
    grabNotes()
    .then(notes => {
      const div = document.getElementById('notes-container')
      div.innerHTML = ''
      return notes.forEach( note => {
        const previewBtn = document.createElement('button')
        previewBtn.innerText = "PREVIEW"
        previewBtn.dataset.id = note.id
        previewBtn.addEventListener('click', grabEventId)
        const li = document.createElement('li')
        li.innerText = note.title
        div.append(li, previewBtn)
    })})
  }


})
