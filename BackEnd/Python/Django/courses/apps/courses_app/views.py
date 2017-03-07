from django.shortcuts import render, redirect
from .models import Course

# Create your views here.
def index(request):
	context = {
		"courses": Course.objects.all()
	}

	return render(request, 'courses_app/index.html', context)

def process(request):
	if request.method == "POST":
		Course.objects.create(course_name=request.POST['courseName'], description=request.POST['description'])
	return redirect('/')

def delete_course(request, id):
    context = {
        "course": Course.objects.get(id=id)
    }
    return render(request, 'courses_app/destroy.html', context)

def delete_this(request, id):
    this = Course.objects.get(id=id)
    this.delete()
    return redirect('/')
