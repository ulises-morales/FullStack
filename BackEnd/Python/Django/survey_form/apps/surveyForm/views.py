from django.shortcuts import render, redirect

# Create your views here.
def index(request):
	if 'count' not in request.session:
		request.session['count'] = 0
		return render(request, 'surveyForm/index.html')
	else:
		request.session['count'] += 1
		return render(request, 'surveyForm/index.html')


def result(request):
	return render(request, "surveyForm/result.html")

def new_user(request):
	request.session['user_name'] = request.POST['username']
	request.session['user_location'] = request.POST['userlocation']
	request.session['user_language'] = request.POST['userlanguage']
	request.session['user_comment'] = request.POST['usercomment']
	request.session['count'] += 1
	return redirect('/result')

def backHome(request):
	return redirect('/')

















