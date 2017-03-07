from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index), # redirects to the landing page
    url(r'^result$', views.result),
    url(r'^new_user$', views.new_user),
    url(r'^home$', views.backHome)
]
