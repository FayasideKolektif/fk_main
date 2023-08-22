from django.db import models

# Create your models here.
class Members (models.Model): 
    name= models.CharField(max_length=200)
    address = models.CharField(max_length=200,null=True,blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=30,null=True,blank=True)

    def __str__(self):
        return self.name