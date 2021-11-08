const toDo = "To Do";
const inProgress = "In Progress";
const done = "Done";


const list = {
  "create a task": toDo,
  "create a markup": inProgress,
  "make a bed": done,
  "write a post": toDo,
}

function changeStatus(name, status) {
  list[name] = status;
}

function addTask(name) {
    list[name] = toDo;
}

function deleteTask(name) {
    delete list[name];
}

function showList() {
  console.log("To Do:");
  
  for (let task in list) {
    if (list[task] === toDo) {
      console.log(task);
    } 
  }
  
  console.log("In Progress:")
  
  for (let task in list) {
        if (list[task] === inProgress) {
          console.log(task);
        }
      }
  
  console.log("Done:")
  
  for (let task in list) {
        if (list[task] === done) {
          console.log(task);
        }
      }
  
}

console.log(addTask("create"));
console.log(showList())
