// uri: task
let _tasks = {};

function getTasks (user) {
  let result = [];

  for (var uri in _tasks) {
    if (_tasks.hasOwnProperty(uri)) {

      if (user) {
        if (user === _tasks[uri].user)
          result.push(_tasks[uri]);
      }
      else result.push(_tasks[uri]);
    }
  } 

  return result;
}

function getTask (uri) {
  return _tasks[uri];
}

function addTask (task) {
  _tasks[task.uri] = task;
}

function updateTask (task) {
  _tasks[task.uri] = task;
}

function deleteTask (uri) {
  delete _tasks[uri];
}

var Tasks = {
  getTasks: getTasks,
  getTask: getTask,
  addTask: addTask,
  updateTask: updateTask,
  deleteTask: deleteTask
}

module.exports = Tasks;


