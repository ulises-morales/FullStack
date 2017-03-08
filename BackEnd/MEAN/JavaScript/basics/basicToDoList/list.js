console.log("ready");

var todos = [];
var input = prompt("WHat would you like to do?");


while (input !== "quit"){
	if (input === "list"){
		listTodos();
	}
	else if (input === "new"){
		addTodo();
	}
	else if (input === "delete"){
		deleteTodo();
	}

	input = prompt("WHat would you like to do?");
}
console.log("Ok, you quit the app");


//----------------------------------------------
function listTodos(){
	todos.forEach(function(todo, i){
		console.log(i + "." + todo);
	});
}

function addTodo(){
	var newTodo = prompt("Enter new todo");
	todos.push(newTodo);
	console.log("Added Todo");
}

function deleteTodo(){
	var index = prompt("Enter index of todo to delete");
	todos.splice(index, 1);
	console.log("Deleted Todo");
}

