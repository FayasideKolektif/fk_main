# Generated by Django 3.2.20 on 2023-08-02 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_auto_20230801_2147'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articles',
            name='category',
            field=models.CharField(choices=[('plr', 'Philosophy and life reflections'), ('pdg', 'Personal development and growth'), ('scc', 'Social and Cultural commentary'), ('ins', 'Inspirational stories'), ('mwb', 'Mindfulness and Well being'), ('bks', 'Book Reviews'), ('events', 'Events'), ('articles', 'Articles')], max_length=200),
        ),
    ]
