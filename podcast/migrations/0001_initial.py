# Generated by Django 3.2.20 on 2023-07-30 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PodcastSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('podcast_id', models.URLField(null=True)),
                ('client_id', models.CharField(max_length=200)),
                ('client_secret', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddConstraint(
            model_name='podcastsettings',
            constraint=models.UniqueConstraint(fields=('podcast_id',), name='unique_singleton_instance'),
        ),
    ]