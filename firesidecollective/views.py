from django.shortcuts import render
from blog.models import Articles,Exhibition
from events.models import Event
from datetime import date
from blog.models import NewsletterEmail
from django.http import  JsonResponse
from exhibition.models import Exhibition as myexhibition
import cloudinary
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

def subscribe(request):
    if request.method == 'POST':
                email = request.POST.get('email')
                if email:
                    print('Got the mail')
                    if NewsletterEmail.objects.filter(email=email).exists():
                        return JsonResponse({'message': 'You are already registered to Newsletter'})
                    else:
                        NewsletterEmail.objects.create(email=email)
                        
                        return JsonResponse({'message': 'Email added  successfully!'})


    return JsonResponse({'error':'Opps something went wrong .Please try again!'})