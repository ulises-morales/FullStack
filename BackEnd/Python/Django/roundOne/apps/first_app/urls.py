from django.conf.urls import url
from . import views

# def method_to_run(request):
# 	print "Whatever route that was hit by an HTTP request (by the way) decided to invoke me!"
# 	print "By the way, here's the request object that Django automatically passes us:", request
# 	print "By the by, we still aren't delivering anything to the browser, so you should see 'ValueError at /'"

urlpatterns = [
	url(r'^$', views.index),
    url(r'^users$', views.show),
    url(r'^new_user$', views.create)
]






print "This will be for future routes: HTTP request will be captured here"

