# Generated by Django 3.2.20 on 2023-08-06 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0012_exhibition'),
    ]

    operations = [
        migrations.AddField(
            model_name='exhibition',
            name='author',
            field=models.CharField(default='Fayaside Kolectif', max_length=100),
        ),
    ]
