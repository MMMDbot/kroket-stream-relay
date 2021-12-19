import yt_dlp


def getDownloadUrl(source):
    ydl_opts = {
        "format": "best",
        "forceurl": "true",
        "simulate": "true",
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download(source)