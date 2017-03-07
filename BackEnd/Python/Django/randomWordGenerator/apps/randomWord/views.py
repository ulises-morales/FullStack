from django.shortcuts import render, redirect
from random import *
from string import *

# Create your views here.

def index(request):
	if 'count' not in request.session:
		request.session['count'] = 0
		return render(request, "randomWord/index.html")
	else:
		request.session['count'] += 1
		return render(request, "randomWord/index.html")

def generator(request):
	if request.method == "GET":
		if request.GET['randword'] == 'Reset':
			request.session.clear()
			return redirect('/')

		else:
			request.session['randword'] = ''.join(choice(ascii_uppercase) for i in range(14))
			return redirect('/')