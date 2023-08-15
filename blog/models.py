
from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from taggit.managers import TaggableManager
#from cloudinary.models import CloudinaryField
#from user.models import CustomUser
from django.core.cache import cache
from cloudinary.models import CloudinaryField
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=255)
    def __str__ (self):
        return self.name
# Create your models here.
class Articles (models.Model):    
    user = models.ForeignKey(User,null=True,blank=True,on_delete=models.CASCADE)
    title = models.CharField( max_length=100)
    tagline=models.CharField(max_length=100 ,blank=True,null=True)
    date =models.DateTimeField()
    image = CloudinaryField('image',folder='article_images')
    body = RichTextField( blank=True, null=True)


    publish=models.BooleanField(default=False)
    meta_description = models.TextField( null=True,blank=True)
    meta_keywords = models.CharField(max_length=500, null=True,blank=True)

    views = models.IntegerField(default=0)
    applaud = models.IntegerField(default=0)
    slug = models.SlugField(blank=True, null=True)
    tags = TaggableManager(help_text="Enter comma-separated tags.")

    def __str__(self):
        return self.title +' | ' + str (self.date)

    def snippet(self):
        return self.body[:100] + "..."  
    
    @property
    def num_likes(self):
        return self.liked.all().count()
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class Comments (models.Model):
    name = models.CharField(max_length=222 ,default='')
    article= models.ForeignKey(Articles, related_name='comments' ,on_delete= models.CASCADE)
    comment= models.TextField()
    date= models.DateTimeField(auto_now=True)
    
    author =models.ForeignKey(User,on_delete= models.CASCADE,default=1) 
    

    def __str__(self):
        return f'{self.author.id} commented on {self.article.title}' 
    
LIKE_CHOICES=(
    ('Like','Like'), ('Unlike','Unlike'))

class Like(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    article=models.ForeignKey(Articles,on_delete=models.CASCADE)
    value =models.CharField(choices =LIKE_CHOICES, default='Like', max_length=10)
   
class NewsletterEmail(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.email


class SiteContacts(models.Model):
    address = models.CharField(max_length=200, blank=True, null=True, default='Default Address')
    contact_email = models.EmailField(blank=True, null=True, default='contact@example.com')
    phone = models.CharField(max_length=200, blank=True, null=True, default='123-456-7890')
    facebook = models.URLField(blank=True, null=True, default='https://www.facebook.com')
    instagram = models.URLField(blank=True, null=True, default='https://www.instagram.com')
    twitter = models.URLField(blank=True, null=True, default='https://www.twitter.com')
    youtube = models.URLField(blank=True, null=True, default='https://www.youtube.com')
    spotify_podcast = models.URLField(blank=True, null=True, default='https://www.spotify.com')
    apple_podcast = models.URLField(blank=True, null=True, default='https://www.apple.com')
    youtube_podcast = models.URLField(blank=True, null=True, default='https://www.youtube.com')

    @classmethod
    def get_site_contact_details(cls):
        cached_details = cache.get('site_contact_details')
        if cached_details is None:
            details = cls.objects.first()
            cache.set('site_contact_details', details)
        else:
            details = cached_details
        return details

    def save(self, *args, **kwargs):
        # Invalidate cache when the contact details are updated
        cache.delete('site_contact_details')
        super().save(*args, **kwargs)
    def __str__(self) -> str:
        return 'Site Contact Settings'

class Exhibition(models.Model):
    #image = models.FileField()
    image = CloudinaryField('image',folder='exhibition_images')
    material = models.CharField(max_length=200,null=True,blank=True)
    title = models.CharField( max_length=200)
    author = models.CharField( max_length=200,default='Fayaside Kolectif')
    description = RichTextField( blank=True, null=True)
    slug = models.SlugField(blank=True,null=True,help_text='Optional')
    date = models.DateTimeField(auto_now_add=True)
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)