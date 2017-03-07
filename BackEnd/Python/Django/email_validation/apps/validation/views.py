from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from django.urls import reverse
from .models import Email

# Create your views here.
def index(request):
	return render(request, 'validation/index.html')

def process(request):
	if Email.object.validEmail(request.POST['email']):
		Email.object.create(email=request.POST['email'])
		messages.success(request, 'The email address ' + request.POST['email'] + 'is a valid email')
		print "SUCCESS!!!!"
		return redirect ('/success')
	else:
		messages.warning(request, 'Invalid email!')
		print "Failed!!!!"
		return redirect('/')


def success(request):
	context = {
		"emails": Email.object.all()
	}

    	return render(request, 'validation/success.html', context)

def deleting(request, id):
	this_email = Email.object.get(id=id)
	this_email.delete()
	return redirect('/deleted')

def deleted(request):
	return redirect('/success')

