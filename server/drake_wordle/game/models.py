from django.db import models

# Create your models here.

class Song(models.Model):
    name = models.CharField(max_length=64)
    album = models.CharField(max_length=64)
    trackNum = models.IntegerField()
    trackLength = models.CharField(max_length=64)
    features = models.TextField(blank=True, help_text="Comma-separated list of featured artists")

    def __str__(self):
        return self.name

    def get_features_list(self):
        return [feature.strip() for feature in self.features.split(',') if feature.strip()]