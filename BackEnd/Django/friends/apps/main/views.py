from django.shortcuts import render, redirect, HttpResponse
from django.contrib import messages
from django.db.models import Count
from django.core.urlresolvers import reverse
from .models import User

# Create your views here.
def index(request):
	if "id" in request.session:
		request.session['logged_in'] = True
		return redirect('/dashboard')
	return render(request, 'main/index.html')


def register(request):
	if request.method != "POST":
		# return redirect('index')
		return redirect(reverse('index'))
	else:
		user_account = User.objects.validRegistration(request.POST)
		if user_account[0] == True:
			request.session['id'] = user_account[1].id
			return redirect(reverse('dashboard'))
		else:
			for error_message in user_account[1]:
				messages.error(request, error_message)
			return redirect(reverse('index'))

def login(request):
	if request.method != "POST":
		return redirect(reverse('index'))
		print ("%"*50)
	else:
		user_account = User.objects.validLogin(request.POST)
		if user_account[0] == True:
			request.session['id'] = user_account[1].id
			print ("*"*50), request.POST['email']
			return redirect(reverse('dashboard'))
		else:
			for error_message in user_account[1]:
				messages.error(request, error_message)
			return redirect(reverse('index'))

def logout(request):
	request.session.clear()
	return redirect (reverse('index'))

def dashboard(request):
	if 'id' not in request.session:
		return redirect(reverse('index'))
	user = User.objects.get(id=request.session['id'])
	print "*"* 50, user.name
	friend = User.objects.filter(friends__id=request.session['id'])
	# print "^"* 50, friend
	notfriends = User.objects.all().exclude(friends__id=request.session['id'])

	context = {
		'user': user,
		'friend': friend,
		'notfriends': notfriends,
	}

	return render(request, 'main/dashboard.html', context)

def friends(request, friend_id):
	friend = User.objects.get(id=friend_id)

	context = {
		'friend': friend,
	}

	return render(request, 'main/friends.html', context)

def addfriend(request, friend_id):
	if request.method != "POST":
		messages.error(request, "I see what you're trying to do there")
		return redirect (reverse('index'))
	else:
		adding_friend = User.objects.addFriend(request.session['id'], friend_id)
		if 'errors' in adding_friend:
			messages.error(request, adding_friend['errors'])
		return redirect(reverse('dashboard'))

def removefriend(request, friend_id):
	if request.method != 'GET':
		messages.error(request, "Nope, can't remove this friend")
		return redirect (reverse('index'))
	else:
		removing_friend = User.objects.removeFriend(request.session['id'], friend_id)
		return redirect(reverse('dashboard'))






