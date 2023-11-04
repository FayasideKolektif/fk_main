from django.db import models
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField
from django.utils.text import slugify

# Create your models here.

class ExhibitionGroup(models.Model):
    name = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    
class Exhibition(models.Model):
    #image = models.FileField()
    exhibitiongroup= models.ForeignKey(ExhibitionGroup,related_name='exhibitiongroup', help_text='To what group does this exhibtion belong ?',on_delete=models.CASCADE)
    image = CloudinaryField('image',folder='exhibition_images')
    files = CloudinaryField('file', resource_type='raw', folder='downloadable_files',null=True,blank=True)
    material = models.CharField(max_length=500,null=True,blank=True,help_text='Max 500 words')
    title = models.CharField(max_length=500,help_text='Max 500 words')
    author = models.CharField( max_length=500,default='Fayaside Kolectif', help_text='Optional Field - Default author is Fayaside Kolectif')
    description = RichTextField( blank=True, null=True, help_text='An overview of an exhibition')
    slug = models.SlugField(blank=True,null=True,help_text='Optional')
    date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    def __str__(self):
        return self.title
    



