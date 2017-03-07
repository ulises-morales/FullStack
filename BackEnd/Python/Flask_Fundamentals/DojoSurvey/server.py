from flask import Flask, render_template, request, redirect
app = Flask(__name__)

@app.route('/',)
def index():
	return render_template("index.html")

@app.route('/result', methods=['POST'])
def result():
	# fname = request.form['Name']
	# fdojos = request.form['Dojos']
	# flanguage = request.form['Language']
	# fcomment = request.form['Comment']
	# freturn render_template('result.html', sname = fname, sdojos = fdojos, slanguage = flanguage)
	if request.method == 'POST':
		result = request.form
		return render_template("result.html", result = result)
	

	# return redirect('/')

app.run(debug=True)