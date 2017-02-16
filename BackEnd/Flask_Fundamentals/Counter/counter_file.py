from flask import Flask, render_template, session, redirect, request
app = Flask(__name__)
app.secret_key = "ToejamAndEarl"

@app.route('/')
def index():
    if 'count' not in session:
        session['count'] = 1
        return render_template("index.html")
    else:
        session['count'] += 1
    return render_template('index.html')

@app.route('/increment', methods=['GET', 'POST'])
def set_increment():
    if request.form['increment_btn'] == 'increment':
        session['count'] += 1
        return redirect('/')


@app.route('/clear', methods=['get', 'post'])
def clear_it():
    if request.form['clear_btn'] == 'clear':
        session['count'] = 0
        return redirect('/')

app.run(port=5000, debug=True)
