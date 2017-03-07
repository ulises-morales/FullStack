from django.shortcuts import render
from datetime import datetime

# Create your views here.
def index(request):
	current = {"somekey":datetime.now()}
	return render(request, "timedisplay/index.html", current)