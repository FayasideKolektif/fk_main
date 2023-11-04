from django.db import models

# Create your models here.
class Event(models.Model):
    image = models.ImageField(blank=True,null=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    venue = models.CharField(max_length=200)
    organizer = models.CharField(max_length=100)

    def __str__(self):
        return self.title
