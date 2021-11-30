import ffmpeg
import os
import requests
from encode import yt


def thumbnail_generator():
    request_url = "http://localhost:3001/api/ingests"
    # Get all the ingests
    r_ingests = requests.get(url=request_url)
    r_ingests_json = r_ingests.json()

    active_array = []

    # Store only the active ingests in an array
    for stream in r_ingests_json:
        if stream["active"]:
            active_array.append(stream)

    # Set playlistUrl and folder id for each stream
    for stream in active_array:
        if ".m3u8" in stream["origin"]:
            playlistUrl = stream["origin"]
        else:
            # Convert youtube videos to .m3u8 using yt-dlp
            try:
                playlistUrl = yt(stream["origin"])
            except Exception as e:
                print(e)
        id = stream["folder"]
        # Use ffmpeg to generate and save the thumbnail from an HLS playlist and a folder id (for storage)
        try:
            save_thumbnail(playlistUrl, id)
        except Exception as e:
            print(e)


def save_thumbnail(playlistUrl, id):
    current_directory = "/home/square/kroket-stream-relay/backend/public/streams/"
    output_path = os.path.join(current_directory, id, "thumbnail.jpeg")
    input = ffmpeg.input(playlistUrl)
    stream = ffmpeg.output(input, output_path, vframes=1, s="250x141", y=None)
    subp = ffmpeg.run(stream)


thumbnail_generator()
