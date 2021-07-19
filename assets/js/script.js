// Get Selector
let todo_input_work   = document.querySelector('.todo-input-work');
let todo_input_client = document.querySelector('.todo-input-client');
let todo_input_date   = document.querySelector('.todo-input-date');
let todo_input_time   = document.querySelector('.todo-input-time');
let todo_button       = document.querySelector('.todo-button');
let todo_msg          = document.querySelector('small');
let todo_list         = document.querySelector('.todo-container ul');
// let todo_main_list    = document.querySelector('.todo-main');
let filterOption      = document.querySelector('.filter-todo');
let totalItem         = document.querySelector('.count');




/**
 * Add Todo Item
 */
todo_button.onclick = (event) => {
 event.preventDefault();
 // get all input value
 let todo_work   = todo_input_work.value;
 let todo_client = todo_input_client.value;
 let todo_date   = todo_input_date.value;
 let todo_time   = todo_input_time.value;

 let day1 = new Date(todo_date + ' ' + todo_time);
 let day2 = new Date();
 let id = Math.floor(Math.random()*100000);


 let todo_input = 
   {
      id   : `${id}`,
      work : `${todo_work}`, 
      client : `${todo_client}`, 
      date : `${todo_date}`, 
      time : `${todo_time}`,
      remain : `${day1.getTime() - day2.getTime()}`,
      status : 'work'
   };


 // get all data from local storage
 let storageVar = localStorage.getItem('todoappes');
//  console.log(storageVar);

 // Create temporary property
 let todoArr;

 // Check whether the local storage data has or not
 if(storageVar == null){
   todoArr = [];
 }else {
   todoArr = JSON.parse(storageVar);
 }


 // check all input filed is empty
 if(todo_work == '' || todo_client == '' || todo_date == '' || todo_time == ''){
    todo_msg.innerHTML = "Todo field is required !";
 }else {

    // push new todo item
    todoArr.push(todo_input);
    // data add into localstorage
    localStorage.setItem('todoappes', JSON.stringify(todoArr));



    // successfully date store into loaclstorage then empty all form input
    todo_input_work.value = "";
    todo_input_client.value = "";
    todo_input_date.value = "";
    todo_input_time.value = "";

    showTodo();
 }
}



// auto load showTodo
setInterval(() => {
  showTodo();
}, 1000);


/**
 * show todo list
 */
function showTodo(){
  //get all data form local storage
  let todoVar = localStorage.getItem('todoappes');

  // Create temporary property 
  let todoArr;
  let data = '';

  if(todoVar == null){
    todoArr = [];
  }else {
    todoArr = JSON.parse(todoVar);
  }

  todoArr.map((val, index) => { 
    if(val.status == 'work'){
      data += `<div class="todo-main-${index} td uncompleted" style="margin-bottom: 5px;"><div class="todo" style="margin: 0px;">
                  <li class="todo-item">
                      <span>${val.work}</span> | <b>Client:</b> <span>${val.client}</span> | <span><b>Remain Time: </b>[${remainTime(val.date, val.time)}]</span>
                  </li>
                  <button class="complete-btn" onclick="todoCheck(${val.id})"><i class="fas fa-check"></i></button>
                  <button class="trash-btn" onclick="todoDelete(${index})"><i class="fas fa-trash"></i></button>      
              </div>
              <span style="display: block; ${rangeBar(val. remain, val.date, val.time)}; height: 4px;"></span></div>`;
    }else {
          data += `<div class="todo-main-${index} completed" style="margin-bottom: 5px;"><div class="todo" style="margin: 0px;">
          <li class="todo-item">
              <span>${val.work}</span> | <b>Client:</b> <span>${val.client}</span> | <span style="color: Green;"><b>Work Done</b></span>
          </li>
          <button class="complete-btn" onclick="todoCheck(${val.id})"><i class="fas fa-check"></i></button>
          <button class="trash-btn" onclick="todoDelete(${index})"><i class="fas fa-trash"></i></button>      
      </div></div>`;
    }

    todo_list.innerHTML = data;

    totalItem.innerHTML = todoArr.length;
  });
}

showTodo();

// style=""

/**
 * Remain Time function 
 */
function remainTime(date, time){
    let countDownDate = new Date(`${date}, ${time}`).getTime();
    let now = new Date().getTime();

    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    
    if (distance < 0) {
      return '<span style="color:red;">Time over</span>';
    }else {
      return `${days} days ${hours} hours  ${minutes} mins ${seconds} sec`;
    }
}


/**
 * Range Bar
 */
function rangeBar(remain, date, time){
  let countDownDate = new Date(`${date}, ${time}`).getTime();
  let now = new Date().getTime();
  let current_remain = countDownDate - now;
  let remainPer = (100*current_remain) / remain;
  let width =  Math.floor(remainPer);
  // console.log(width);

  if( width <= 0 ){
    width = `widht:${width}%; background-color:red;`;
  }else if(width >= 0 && width <= 30){
    width = `width:${width}%; background-color:#ffb8b8;`;
  }else if(width >= 30 && width <= 40){
    width = `width:${width}%; background-color:#17c0eb;`;
  }else if(width >= 41 && width <= 70){
    width = `width:${width}%; background-color:blue;`;
  }else if(width >= 71 && width <= 100){
    width = `width:${width}%; background-color:green;`;
  }

  return width;
}


/**
 * Delete Todo
 */
function todoDelete(index){
  // get local storage data
  let storageVal = localStorage.getItem('todoappes');
  let todoArr;

  if(storageVal == null){
    todoArr = [];
  }else {
    todoArr = JSON.parse(storageVal);
  }

  let todo_main_list  = document.querySelector('.todo-main-'+index);
  todo_main_list.classList.add('fall')
  
  // console.log(event);

  todo_main_list.addEventListener("transitionend", function() {
    // remove todo list
    todoArr.splice(index, 1);
    localStorage.setItem('todoappes', JSON.stringify(todoArr));
    // console.log(todoArr);
    showTodo();
  });

  
}


/**
 * Todo Check
 */
function todoCheck(id){
  let storageVal = JSON.parse(localStorage.getItem('todoappes'));
  if(storageVal){
    const currentItem = storageVal.find((item) => item.id == id);
    if(currentItem.status == 'work'){
      currentItem.status = "completed";
    }else {
      currentItem.status = "work";
    }
    // console.log(currentItem);
    localStorage.setItem('todoappes', JSON.stringify(storageVal))
    showTodo();
  }

}

  


/**
 * Filter Todo
 */
 filterOption.onchange = (e) => {
   const todos = todo_list.childNodes;
   console.log(e.target.value);

   todos.forEach((todo) => {
     switch(e.target.value){
       case "completed":
         if(todo.classList.contains("completed")){
           todo.style.display = "flex";
         }else {
           todo.style.display = "none";
         }
         break;
       case "uncompleted":
         if(todo.classList.contains("uncompleted")){
           todo.style.display = "flex";
         }else {
           todo.style.display = "none";
         }
         break;
     }
    
   });
   showTodo();
 }