from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404
from .models import Event
from datetime import date

def events(request, filter=None):
    today = date.today()
    filter = request.GET.get('filter', None)
    if filter == 'past':
        past_events = Event.objects.filter(date__lt=today).order_by('-date')
        events = past_events

    else :
        upcoming_events = Event.objects.filter(date__gte=today).order_by('date')
        events = upcoming_events

    return render(request, 'events/events.html', {'events': events})
def event_detail(request, event_id):
    event = get_object_or_404(Event, pk=event_id)
    return render(request, 'events/event_detail.html', {'event': event})
