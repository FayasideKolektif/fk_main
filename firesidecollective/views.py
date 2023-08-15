from django.shortcuts import render
from blog.models import Articles,Exhibition
from events.models import Event
from datetime import date

def home(request):
       articles=Articles.objects.all
       today = date.today()
       events = Event.objects.filter(date__gte=today).order_by('date')[:3]
       context={
              'articles':articles,
              'events':events
       }
       return render(request, 'main/home.html',context)
def about(request):
       return render(request, 'main/about.html')
def exhibitions(request):
       exhibitions = Exhibition.objects.all()[:8]
       context={
              'exhibitions':exhibitions,
       }
       return render(request, 'blog/exhibitions.html',context)