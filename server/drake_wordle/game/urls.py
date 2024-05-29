from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('song-search/', views.songSearch, name='songSearch'),
    path('make-guess/', views.makeGuess, name='makeGuess'),
]