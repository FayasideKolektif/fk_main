# Generated by Django 3.2.20 on 2023-11-04 10:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('exhibition', '0003_exhibitiongroup'),
    ]

    operations = [
        migrations.AddField(
            model_name='exhibition',
            name='exhibitiongroup',
            field=models.ForeignKey(default=1, help_text='To what group does this exhibtion belong', on_delete=django.db.models.deletion.CASCADE, related_name='exhibitiongroup', to='exhibition.exhibitiongroup'),
        ),
    ]
