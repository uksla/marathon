const STATUSES = {
	toDo: "TODO",
  inProgress: "In Progress",
  done: "Done",
}

const PRIORITY = {
	high: "high",
  low: "low",
}

const list = [
{
    id: 1,
    name: "create a post",
    status: STATUSES.toDo,
    priority: PRIORITY.low
  },
  {
    id: 2,
    name: "work",
    status: STATUSES.done,
    priority: PRIORITY.high
  },
  {
    id: 3,
    name: "test",
    status:	STATUSES.toDo,
    priority: PRIORITY.high
  },
  {
    id: 4,
    name: "call",
    status: STATUSES.inProgress,
    priority: PRIORITY.high
  },
  {
    id: 5,
    name: "shopping",
    status: STATUSES.done,
    priority: PRIORITY.high
  },
]

function addTask(name, status = STATUSES.toDo, priority = PRIORITY.high) {
	const task = {
  	id: list.length + 1,
    name,
    status,
    priority
  }
  
  list.push(task);
}

function taskFilterBy(filterBy) {
	let newArr = list.filter(item => item.status === filterBy);
  return newArr;
}

function logName(taskFunc) {{
  for (i = 0; i < taskFunc.length; i++) {
       console.log(taskFunc[i].name)
     }   
 }}
  
  
function showList() {
	console.log("To Do:")
	logName(taskFilterBy(STATUSES.toDo))
  
  console.log("In Progress:")
	logName(taskFilterBy(STATUSES.inProgress))
  
  console.log("Done:")
	logName(taskFilterBy(STATUSES.done))
}

console.log(showList());