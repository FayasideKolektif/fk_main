# Generated by Django 3.2.20 on 2023-07-29 23:51

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import taggit.managers


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('taggit', '0005_auto_20220424_2025'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Articles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('body', ckeditor.fields.RichTextField(blank=True, null=True)),
                ('slug', models.SlugField()),
                ('date', models.DateTimeField()),
                ('image', models.FileField(upload_to='')),
                ('tagline', models.CharField(blank=True, max_length=100, null=True)),
                ('views', models.IntegerField(default=0)),
                ('applaud', models.IntegerField(default=0)),
                ('publish', models.BooleanField(default=False)),
                ('category', models.CharField(choices=[('plr', 'Philosophy and life reflections'), ('pdg', 'Personal development and growth'), ('scc', 'Social and Cultural commentary'), ('ins', 'Inspirational stories'), ('mwb', 'Mindfulness and Well being'), ('bks', 'Book Reviews')], max_length=200)),
                ('password_required', models.BooleanField(default=False)),
                ('post_medium', models.BooleanField(default=False)),
                ('featured_order', models.IntegerField(blank=True, null=True)),
                ('meta_description', models.TextField(blank=True, null=True)),
                ('meta_keywords', models.CharField(blank=True, max_length=500, null=True)),
                ('tags', taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags')),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(choices=[('Like', 'Like'), ('Unlike', 'Unlike')], default='Like', max_length=10)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blog.articles')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=222)),
                ('comment', models.TextField()),
                ('date', models.DateTimeField(auto_now=True)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='blog.articles')),
                ('author', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]