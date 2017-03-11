module.exports = function Route(app){
	// root route to render the index.ejs view
	app.get('/', function(req, res) {
	 res.render("index");
 });
	// post route for adding a data from a survey
	app.post('/result', function(req, res) {
    console.log(req.body);
    // below is the user data object
		submitted_info = {
			name: req.body.name,
			locations: req.body.dojo_location,
			languages: req.body.favorite_language,
			comment: req.body.comment,
		};
	 	res.render("results",{user_data: submitted_info});
	});
};
