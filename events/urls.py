from django.urls import path,include
from . import views

urlpatterns = [
   
    path('',views.events, name="events"),
    path('events/<slug:event_id>',views.event_detail, name='single_event')

]