// index: task
let _tasks = {};

function getTasks(user) {
  let result = [];

  for (var index in _tasks) {
    if (_tasks.hasOwnProperty(index)) {

      if (user) {
        if (user.toLowerCase() === _tasks[uri].user.toLowerCase())
          result.push(_tasks[index]);
      } else result.push(_tasks[index]);
    }
  }

  return result;
}

function getTask(index) {
  return _tasks[index];
}

function addTask(task) {
  _tasks[task.index] = task;
}

function updateTask(task) {
  _tasks[task.index] = task;
}

function deleteTask(index) {
  delete _tasks[index];
}

var Tasks = {
  getTasks: getTasks,
  getTask: getTask,
  addTask: addTask,
  updateTask: updateTask,
  deleteTask: deleteTask
}

module.exports = Tasks;
