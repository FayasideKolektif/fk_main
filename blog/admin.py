from django.contrib import admin
from .models import Articles,Comments,Like,Category,NewsletterEmail,SiteContacts,Exhibition
# Register your models here.
admin.site.register(Comments)
admin.site.register(Like)
admin.site.register(Category)
admin.site.register(NewsletterEmail)
admin.site.register(SiteContacts)
# admin.site.register(Exhibition)

class ArticleAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Basic Information', {
            'fields': ('user','author','title', 'tagline', 'date', 'tags', 'slug'),
        }),
        ('Content', {
            'fields': ('image', 'body','files'),
        }),
        ('Meta Data', {
            'fields': ('meta_description', 'meta_keywords'),
        }),
        ('Publishing Options', {
            'fields': ('publish', 'views', 'applaud'),
        }),
    )

admin.site.register(Articles, ArticleAdmin)

