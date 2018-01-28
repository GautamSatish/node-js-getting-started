// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var cors = require('cors');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use CORS to allow local host connects
app.use(cors());

var port     = process.env.PORT || 8080; // set our port
var taskCtr  = 0;

// Import Task APIs
var tasks     = require('./tasks');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /tasks
// ----------------------------------------------------
router.route('/tasks')

	// create a new task (accessed at POST http://localhost:8080/tasks)
	.post(function(req, res) {
          var task = {
            uri: '/tasks/'+taskCtr,
            index: taskCtr,
            label: req.body.label + '',
            status: req.body.status || 'ok',
            user : req.body.user || 'temp'
          }
          tasks.addTask(task);
	  res.json({ message: 'Task '+ taskCtr + ' created!'});
          taskCtr++;
	})

	// get all the tasks (accessed at GET http://localhost:8080/tasks)
	.get(function(req, res) {
          var taskList;
          var user = req.query.user;

          taskList = tasks.getTasks(user);
	  res.json(taskList);
	});

// on routes that end in /tasks/:task_id
// ----------------------------------------------------
router.route('/tasks/:task_id')

	// get the task with that id
	.get(function(req, res) {
          var task;
          task = tasks.getTask(req.url);
          res.json(task);
	})

	// update the task with this id
	.put(function(req, res) {
          var task = {
            uri: req.url,
            label: req.body.label + '',
            status: req.body.status || 'ok',
            user : req.body.user || 'temp'
          }
          tasks.updateTask(task);
          res.json({message: 'Task ' + req.url + ' edited!'});
	})

	// delete the task with this id
	.delete(function(req, res) {
          tasks.deleteTask(req.url);
	  res.json({ message: 'Task ' + req.url + ' deleted!' });
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
