from django.db import models
from django.core.exceptions import ValidationError
from django.contrib import messages

# Create your models here.
class PodcastSettings(models.Model):
    podcast_id=models.CharField(null=True,max_length=200)
    client_id = models.CharField(max_length=200)
    client_secret =models.CharField(max_length=200) 

    class Meta:
        # Add a unique constraint to the model
        constraints = [
            models.UniqueConstraint(fields=['podcast_id'], name='unique_singleton_instance')
        ]

    def save(self, *args, **kwargs):
        # Override the save method to ensure only one instance is allowed
        if not self.pk and PodcastSettings.objects.exists():
            #raise ValidationError("Only one instance of SingletonModel is allowed.")
            pass
        else:
            super().save(*args, **kwargs)
