from flask import Flask, render_template, session, request, redirect
import random
app = Flask(__name__)
app.secret_key = "iNeedCoffeeBecauseImTired"

@app.route('/', methods=['GET',"POST"])
def index():
    if "num" not in session:
        session['num'] = random.randrange(0, 101) # random number between 0-100
    return render_template('index.html')


@app.route('/winner', methods=["get","post"])
def winning_guess():
        session["str"] = ""
        session["guess_number"] = int(request.form["random_guess"])
        guess_number = int(session["guess_number"])

        if guess_number == session['num']:
            session["chickenfingerlickin"] = "Victory!!!!"
            session["str"] += session["chickenfingerlickin"]
            print (session["str"])
            return redirect("/")
        elif guess_number > session['num']:
            session["toohigh"] = "Too High"
            session["str"] += session["toohigh"]
            print (session["str"])
            return redirect("/")
        elif guess_number < session['num']:
            session["toolow"] = "Too Low"
            session["str"] += session["toolow"]
            print (session["str"])
            return redirect("/")

app.run(port=5000, debug = True)
