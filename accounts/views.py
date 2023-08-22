from django.shortcuts import render
from .models import Members
from django.contrib import messages
from django.http import HttpResponseRedirect

# Create your views here.
def addmember(request):
    if request.method == 'POST':
        email= request.POST.get('email')
        name = request.POST.get('name')
        try:
            if Members.objects.filter(email=email).exists():
                messages.error(request, 'A member with this Email Already Exist')
            else:    
                Members.objects.create(name=name,email=email)
                messages.success(request, 'Thank you for joining the community! ')
        except:
            messages.error(request, 'Opps something went wrong!')
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))

    else:
        return ('home')