// Selectors

const todoInput     = document.querySelector('.todo-input');
const todoBtn       = document.querySelector('.todo-btn');
const todoList      = document.querySelector('.todo-list');
const filterTodo    = document.querySelector('.filter-todo');

// Eventlistener

// when dom will be loaded
document.addEventListener('DOMContentLoaded', getTodos);

//adding todo item
todoBtn.addEventListener('click', addTodo);

// deleting todo item 
todoList.addEventListener('click', deleteCheck);

// filtering todo item
filterTodo.addEventListener('click', filterTodos);


// Functions

function addTodo(event)
{
    event.preventDefault();
    if(!todoInput.value)
    {
        alert('Please Input');
        return false;
    }
    
     // Create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // set todo in localstorage
    saveLocalTodos(todoInput);

    // Create complete button
    const completeBtn       = document.createElement('button');
    completeBtn.innerHTML   ='<i class="fa fa-check"></i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);


    // Create trash button
    const trashBtn       = document.createElement('button');
    trashBtn.innerHTML   ='<i class="fa fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);
    todoList.appendChild(todoDiv);

    //todoInput value after submitting form
    todoInput.value = "";
    // console.log(todoDiv);
}


// delete item 

function deleteCheck(event)
{
    const item = event.target;
    if(item.classList[0]=== "trash-btn")
    {
        const todoItem = item.parentElement;
        if(todoItem.classList.contains('completed') == false)
        {

            //animation 
            todoItem.classList.add('fall');

            // remove from localStorage 
            removeLocalTodos(todoItem);

            //this event will call after animation 
            todoItem.addEventListener('transitionend',function(){
                todoItem.remove();
            });
            // todoItem.remove();
        }else{
            alert('Please Deselect First, To remove this Item.');
        }
    }

    // check complete 
    if(item.classList[0]=== "complete-btn")
    {
        const todoItem = item.parentElement;
        todoItem.classList.toggle('completed');
        const itemText  = (todoItem.childNodes[0].innerText);
        const itemClass = (todoItem.classList[1]);

        if(todoItem.classList.contains('completed'))
        {

            if(localStorage.getItem('todosClass')=== null)
            {
                todosClass = [];
            }else{
                todosClass = JSON.parse(localStorage.getItem('todosClass'));
            }

            // console.log(todosClass);
            todosClass.push({
                item : itemText,
                class: itemClass
            });
            localStorage.setItem('todosClass',JSON.stringify(todosClass));
        }else{

            todosClassList = JSON.parse(localStorage.getItem('todosClass'));
            for(var i=0; i<todosClassList.length; i++)
            {
                // console.log(todosClassList[i].item , todoIndex);
                if(todosClassList[i].item == itemText)
                {
                    const findTask = function(todosClassList,value){				//line 1
                        const position = todosClassList.findIndex(function(objectTodo){  //line 2
                            return objectTodo.item.toLowerCase() === itemText.toLowerCase() //line 3
                        })
                        return position
                    }
                    
                    // find index from object property
                    todosClassList.splice(findTask(todosClassList,itemText),1);
                }

                localStorage.setItem('todosClass',JSON.stringify(todosClassList));
            }

        }
    }
    // console.log(event.target)
}



function filterTodos(event)
{
    const todos = todoList.childNodes;
    todos.forEach(function(todo){

        // switch statement for filtering all item 
        switch(event.target.value)
        {
            case "all":
                todo.style.display="flex";
            break;

            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
            break;

            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
        }



    });
    
}


function saveLocalTodos(todoInput)
{
    const todo = todoInput.value;

    let todos;
    if(localStorage.getItem('todos')=== null)
    {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));

}



function getTodos()
{

    let todos;
    if(localStorage.getItem('todos')=== null)
    {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
        todosClassList = JSON.parse(localStorage.getItem('todosClass'));
    }

    todos.forEach(function(todo,i){

        // Create div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
   
        // Create Li
        const newTodo = document.createElement('li');

        if(todosClassList && todosClassList.length>0){

            for(var i=0; i<todosClassList.length; i++)
            {
                if(todosClassList[i].item == todo)
                {
                    todoDiv.classList.add('completed');
                }
            }
        }

        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

    
        // Create complete button
        const completeBtn       = document.createElement('button');
        completeBtn.innerHTML   ='<i class="fa fa-check"></i>';
        completeBtn.classList.add('complete-btn');
        todoDiv.appendChild(completeBtn);
    
    
        // Create trash button
        const trashBtn       = document.createElement('button');
        trashBtn.innerHTML   ='<i class="fa fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn);
        todoList.appendChild(todoDiv);
    
    });


}



// remove from localstorage one by one
function removeLocalTodos(todo) {
    //CHECK---Hey do I already have things in there?
    let todos,todosClassList;
    if (localStorage.getItem('todos')===null) {
        todos=[];
        todosClassList=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
        todosClassList = JSON.parse(localStorage.getItem('todosClass'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1); // for slice value from array

    for(var i=0; i<todosClassList.length; i++)
    {
        // console.log(todosClassList[i].item , todoIndex);
        if(todosClassList[i].item == todoIndex)
        {
            const findTask = function(todosClassList,value){				//line 1
                const position = todosClassList.findIndex(function(objectTodo){  //line 2
                    return objectTodo.item.toLowerCase() === todoIndex.toLowerCase() //line 3
                })
                return position
            }
            
            // find index from object property
            todosClassList.splice(findTask(todosClassList,todoIndex),1);
        }

        localStorage.setItem('todosClass',JSON.stringify(todosClassList));
    }

    localStorage.setItem('todos',JSON.stringify(todos));  

}

