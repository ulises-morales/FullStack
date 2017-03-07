from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^process$', views.process),
    # url(r'^destroy$', views.destroy),
    url(r'^delete_course/(?P<id>\d+)$', views.delete_course, name="deletecourse"),
    url(r'^deletethis/(?P<id>\d+)$', views.delete_this, name="deletethis")
]
