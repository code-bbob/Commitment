
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.CommitView.as_view(), name='commit'),
    path('group/', views.GroupView.as_view(), name= 'group'),
]
