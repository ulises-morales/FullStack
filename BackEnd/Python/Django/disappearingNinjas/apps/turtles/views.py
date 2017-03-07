from django.shortcuts import render

# Create your views here.
def index(request):
	return render(request, "turtles/index.html")

def showAll(request):
    context = {
        'ninjaT_name': 'all'
    }
    return render(request, 'turtles/ninja.html', context)

def ninja(request, color):
    context = {
        'ninjaT_name': color
    }
    return render(request, "turtles/ninja.html", context)