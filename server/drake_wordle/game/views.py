from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json, random
from .models import Song
from django.http import JsonResponse





def getRandomSong():
    songs = list(Song.objects.all().values())
    song = random.choice(songs)
    #song = songs[0]
    print(song["name"])
    if song["features"] == "":
        song["features"] = "No features"
    return song



gameSong = getRandomSong()
# Create your views here.
def index(request):
    
    return render(request, "index.html")

@csrf_exempt
def songSearch(request):
    
    if request.method == "POST":
        songsToReturn = []
        data = json.loads(request.body)
        text = data["text"]
        allSongs = list(Song.objects.all().values())

        for song in allSongs:
            if (text.lower() in song['name'].lower() and len(text) < len(song["name"]) and len(text) > 1):
                songsToReturn.append(song)
    return JsonResponse(songsToReturn, safe=False)

def getSeconds(trackLength):
    mins, seconds = map(int, trackLength.split(':'))
    return mins * 60 + seconds
def evaluateGuess(songData):
    signals = ["0", "0", "0", "0", "0"]
    print(songData["name"])
    print(gameSong["name"])
    if songData["name"] == gameSong["name"]:
        print('ding ding')
        signals = [2, 2, 2, 2, 2]
        print(signals)
        return signals
    if songData["album"] == gameSong["album"]:
        signals[1] = 2
    if songData["trackNum"] == gameSong["trackNum"]:
        signals[2] = 2
    elif int(songData["trackNum"]) == int(gameSong["trackNum"]) - 2 or int(songData["trackNum"]) == int(gameSong["trackNum"]) - 1 or int(songData["trackNum"]) == int(gameSong["trackNum"]) + 2 or int(songData["trackNum"]) == int(gameSong["trackNum"]) + 1:
        signals[2] = 1
    if songData["trackLength"] == gameSong["trackLength"]:
        signals[3] = 2
    else:
        guessSeconds = getSeconds(songData["trackLength"])
        print(guessSeconds)
        realSeconds = getSeconds(gameSong["trackLength"])
        if abs(guessSeconds - realSeconds) <= 45:
            signals[3] = 1

    if songData["features"] == gameSong["features"]:
        signals[4] = 2
    else:
        song = Song.objects.filter(name__icontains=songData["name"]).first()
        
        guessFeatures = song.get_features_list()
        for i in range(len(guessFeatures)):
            if guessFeatures[i] in gameSong["features"]:
                signals[4] = 1

    

    return signals

@csrf_exempt
def makeGuess(request):

    if request.method == "POST":
        data = json.loads(request.body)
        guess = data["guess"]
        print(guess)
        song = Song.objects.filter(name__icontains=guess).first()
        songData = {
            "name": song.name,
            "album": song.album,
            "trackNum": song.trackNum,
            "trackLength": song.trackLength,
            "features": song.features,
        }

        if songData["features"] == "":
            songData["features"] = "No features"
        signals = evaluateGuess(songData)
        songData["signals"] = signals
        print(songData["signals"])
        return JsonResponse(songData, status=200)