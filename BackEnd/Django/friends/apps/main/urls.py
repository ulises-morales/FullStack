from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register$', views.register, name='register'),
    url(r'^login$', views.login, name='login'),
    url(r'^logout$', views.logout, name='logout'),
    url(r'^dashboard$', views.dashboard, name='dashboard'),
    url(r'^friends/(?P<friend_id>\d+)$', views.friends, name='friends'),
    url(r'^addfriend/(?P<friend_id>\d+)$', views.addfriend, name='addfriend'),
    url(r'^removefriend/(?P<friend_id>\d+)$', views.removefriend, name='removefriend'),
]