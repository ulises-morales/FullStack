from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    # url(r'^add_email$', views.add_email, name="addemail"),
    url(r'^success$', views.success, name="success"),
    url(r'^process$', views.process, name="process"),
    # url(r'^remove/(?P<id>\d+)$', views.remove, name="removeEmail"),
    url(r'^deleting/(?P<id>\d+)$', views.deleting, name="deleting"),
    url(r'^deleted$', views.deleted, name="deleted")
]