from django.contrib import admin

# Register your models here.
from podcast.models import PodcastSettings

admin.site.register(PodcastSettings)