var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://ulises:test1@ds119750.mlab.com:19750/mytasklist_ulises', ['tasks']);

// This gets all tasks
router.get('/tasks', function(req, res, next){
	// res.send('TASK API')
	db.tasks.find(function(err, tasks){
		if(err){
			res.send(err);
		}
		res.json(tasks);
	})
});

//This gets single tasks
router.get('/task/:id', function(req, res, next){
	// res.send('TASK API')
	db.tasks.findOne({__id: mongojs.objectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	})
});

module.exports = router;

