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
            text = text.replace(".", "")
            #print(text)
            songName = song["name"]
            songName = songName.replace(".", "")
            #print(test)
            if len(text) == 1 and text.lower() == songName.lower():
                songsToReturn.append(song)
            elif (text.lower() in songName.lower() and len(text) < len(songName) and len(text) > 1):
                songsToReturn.append(song)
    return JsonResponse(songsToReturn, safe=False)

def getSeconds(trackLength):
    mins, seconds = map(int, trackLength.split(':'))
    return mins * 60 + seconds

def evaluateGuess(songData):
    signals = ["0", "0", "0", "0", "0"]
    arrows = ["", "", "", "", ""]
    print(songData["name"])
    print(gameSong["name"])
    
    if songData["name"] == gameSong["name"]: # detect if song is correctly guessed
        print('game over you win')
        signals = [2, 2, 2, 2, 2]
        print(signals)
        return signals, arrows
    if songData["album"] == gameSong["album"]: # detect if album was guessed
        signals[1] = 2


    if songData["trackNum"] == gameSong["trackNum"]: # detect track number
        signals[2] = 2 
    elif int(songData["trackNum"]) == int(gameSong["trackNum"]) - 2 or int(songData["trackNum"]) == int(gameSong["trackNum"]) - 1 or int(songData["trackNum"]) == int(gameSong["trackNum"]) + 2 or int(songData["trackNum"]) == int(gameSong["trackNum"]) + 1:
        signals[2] = 1
    if int(songData["trackNum"]) < int(gameSong["trackNum"]):
        arrows[2] = "^"
    elif int(songData["trackNum"]) > int(gameSong["trackNum"]):
        arrows[2] = "v"


    if songData["trackLength"] == gameSong["trackLength"]: # detect track length
        signals[3] = 2
    else:
        guessSeconds = getSeconds(songData["trackLength"])
        print(guessSeconds)
        realSeconds = getSeconds(gameSong["trackLength"])
        if abs(guessSeconds - realSeconds) <= 45:
            signals[3] = 1
        if guessSeconds < realSeconds:
            arrows[3] = "^"
        elif guessSeconds > realSeconds:
            arrows[3] = "v"



    if songData["features"] == gameSong["features"]: # detect features
        signals[4] = 2
    else:
        song = Song.objects.filter(name__icontains=songData["name"]).first()
        
        guessFeatures = song.get_features_list()
        for i in range(len(guessFeatures)):
            if guessFeatures[i] in gameSong["features"]:
                signals[4] = 1

    

    return signals, arrows

@csrf_exempt
def makeGuess(request):

    if request.method == "POST":
        data = json.loads(request.body)
        guess = data["guess"]
        print("guess below")
        print(guess)

        song = Song.objects.filter(name__iexact=guess).first()
        songData = {
            "name": song.name,
            "album": song.album,
            "trackNum": song.trackNum,
            "trackLength": song.trackLength,
            "features": song.features,
        }

        if songData["features"] == "":
            songData["features"] = "No features"
        signals, arrows = evaluateGuess(songData)
        songData["signals"] = signals
        songData["arrows"] = arrows
        print(songData["signals"])
        print(songData["arrows"])
        return JsonResponse(songData, status=200)