
from django.urls import path,include
from . import views

urlpatterns = [
   
    path('',views.podcast, name="podcast"),
    path('episode/<slug:slug>',views.episode, name='episode')

]