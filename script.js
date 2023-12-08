// Getting all attribute
const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

//Getting access to localstorage data on page load
const todos = JSON.parse(localStorage.getItem('todos'))
console.log(todos);

//conditional (litrally saying, if todos exist, perform a forEach loop)
if(todos){
   todos.forEach(todo => {
      //Function call whilepassing previously stored todos in the local storage
      addTodo(todo)
   })
}

//Giving the form a event listener of submit
form.addEventListener('submit', (e) => {
   e.preventDefault()

   //Function call to add todo
   addTodo()

})

function addTodo(todo) {
   //Aquiring value from input(directly from the input)
   let todoInput = input.value

   //Occurs when todos are gotten from localstorage
   if(todo){
      todoInput = todo.text
   }

   //Having gotten the todo from either from the localstorage or input do this:
   if(todoInput){

      //Creating li element for todosUL
      const todosLI = document.createElement('li')
      
      //Check if todo and todo completed from localstorage returns truthy 
      if(todo && todo.completed){
         // then do this:
         todosLI.classList.add('completed')
      }

      //Eventlistener to show completed todo while also updating local storage
      todosLI.addEventListener('click', () => {
      todosLI.classList.toggle('completed')
      storeTodo()
   })

   //Eventlistener to remove todo while also updating local storage
   todosLI.addEventListener('contextmenu', (e) => {
      e.preventDefault()

      todosLI.remove()
      storeTodo()
   })

   todosLI.innerText = todoInput

   //Appending li to ul
   todosUL.appendChild(todosLI)

   input.value =''
   storeTodo()

   }
}


//Storing todo in localstorage
function storeTodo(){
   const todoLI = document.querySelectorAll('li')

   const todos = []

   todoLI.forEach(todo => {
      todos.push({
         text: todo.innerText,
         completed: todo.classList.contains('completed')
      })
   })

   localStorage.setItem('todos', JSON.stringify(todos))

}