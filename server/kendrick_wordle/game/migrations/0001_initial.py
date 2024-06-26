# Generated by Django 4.2.1 on 2024-05-28 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('album', models.CharField(max_length=64)),
                ('trackNum', models.IntegerField()),
                ('trackLength', models.CharField(max_length=64)),
                ('features', models.TextField(blank=True, help_text='Comma-separated list of featured artists')),
            ],
        ),
    ]
