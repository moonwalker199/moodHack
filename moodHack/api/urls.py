from django.urls import path, include
from . import views
from rest_framework import routers, viewsets
from api.views import *

urlpatterns = [
    path('', views.home, name="home"),
    path('botresponse/', views.botresponse, name='botresponse'),
]