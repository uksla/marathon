const toDo = "TODO";
const inProgress = "In Progress";
const done = "Done";
const highPriority = "high";
const lowPriority = "low"


const list = [
  {
    id: 1,
    name: "create a post",
    status: toDo,
    priority: lowPriority
  },
  {
    id: 2,
    name: "work",
    status: done,
    priority: highPriority
  },
  {
    id: 3,
    name: "test",
    status: toDo,
    priority: highPriority
  },
  {
    id: 4,
    name: "call",
    status: inProgress,
    priority: highPriority
  },
  {
    id: 5,
    name: "shopping",
    status: done,
    priority: highPriority
  },
  ]
  
  function changeStatus(name, status) {
    list.filter(function (e) {
      if (e.name === name) {
      return e.status = status;
      }
    }) 
  }
  
  function addTask(name) {
    const newObj = {
      id: list.length + 1,
      name,
      status: toDo,
      priority: highPriority
    }
    
    list.push(newObj);
  }

function deleteTask(name) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) {
      list.splice(i, 1);
    }
  }
}

function showList() {

  const taskToDo = list.filter(function (e) {
    if (e.status === toDo) {
      return e.status === toDo;
    }
  })
  const tasksInProgress = list.filter(function (e) {
    if (e.status === inProgress) {
      return e.status === inProgress;
    }
  })
  const tasksDone = list.filter(function (e) {
    if (e.status === done) {
      return e.status === done;
    }
  })
  
  function logName(taskFunc) {
    for (i = 0; i < taskFunc.length; i++) {
      console.log(taskFunc[i].name)
    }
  }
  
  if (taskToDo) {
    console.log("To do:");
    logName(taskToDo);
  }
  
  if (tasksInProgress) {
    console.log("In Progress:");
    logName(tasksInProgress);
  }
  
  if (tasksDone) {
    console.log("Done:");
    logName(tasksDone);
  }
 } 

function showBy(filter) {

  const tasksHighPriority = list.filter(function (e) {
    if (e.priority === highPriority) {
      return e.priority === highPriority;
    }
  })
  const tasksLowPriority = list.filter(function (e) {
    if (e.priority === lowPriority) {
      return e.priority === lowPriority;
    }
 })
 
 function logName(taskFunc) {
    for (i = 0; i < taskFunc.length; i++) {
      console.log(taskFunc[i].name)
    }
 }

  if (filter === "priority") {

    if (tasksHighPriority) {
      console.log("High:");
      logName(tasksHighPriority);
    }

    if (tasksLowPriority) {
      console.log("Low:");
      logName(tasksLowPriority);
    }

  }

  if (filter === "status") {
    showList();
  }
}

   


  
  
 
  


/* console.log(addTask("create")); */
/* console.log(showList()) */
/* console.log(list.length) */
/* console.log(deleteTask('work')) */
/* console.log(changeStatus("test", "In Progress")) */
/* console.log(showList()) */
console.log(showBy('priority'))
/* console.log(list[2])  */