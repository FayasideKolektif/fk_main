from django.shortcuts import render
from .models import Exhibition
# Create your views here.
def exhibitions(request):
       exhibitions = Exhibition.objects.all()[:8]
       context={
              'exhibitions':exhibitions,
       }
       return render(request, 'exhibition/exhibitions.html',context)
