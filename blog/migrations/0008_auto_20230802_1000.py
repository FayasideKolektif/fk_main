# Generated by Django 3.2.20 on 2023-08-02 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_sitecontacts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sitecontacts',
            name='apple_podcast',
            field=models.URLField(blank=True, default='https://www.http//defayasitekolektif.org', null=True),
        ),
        migrations.AlterField(
            model_name='sitecontacts',
            name='facebook',
            field=models.URLField(blank=True, default='https://www.http//defayasitekolektif.org', null=True),
        ),
        migrations.AlterField(
            model_name='sitecontacts',
            name='instagram',
            field=models.URLField(blank=True, default='https://www.http//defayasitekolektif.org', null=True),
        ),
        migrations.AlterField(
            model_name='sitecontacts',
            name='spotify_podcast',
            field=models.URLField(blank=True, default='https://www.http//defayasitekolektif.org', null=True),
        ),
        migrations.AlterField(
            model_name='sitecontacts',
            name='twitter',
            field=models.URLField(blank=True, default='https://www.http//defayasitekolektif.org', null=True),
        ),
        migrations.AlterField(
            model_name='sitecontacts',
            name='youtube',
            field=models.URLField(blank=True, default='https://www.http//defayasitekolektif.org', null=True),
        ),
        migrations.AlterField(
            model_name='sitecontacts',
            name='youtube_podcast',
            field=models.URLField(blank=True, default='https://www.http//defayasitekolektif.org', null=True),
        ),
    ]
