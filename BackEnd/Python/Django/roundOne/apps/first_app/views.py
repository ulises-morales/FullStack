########### CONTROLLER ############
from django.shortcuts import render, redirect


# Create your views here.

def index(request):
	return render(request, "first_app/index.html")

def show(request):
	print(request.method)
	return render(request, "first_app/show_users.html")

def create(request):
 if request.method == "POST":
  print "*"*50
  print request.POST
  print request.method
  print "*"*50
  request.session['name'] = request.POST['first_name']
  return redirect("/")
 else:
  return redirect("/")





