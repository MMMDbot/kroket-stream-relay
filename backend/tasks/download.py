import yt_dlp


def getDownloadUrl(source):
    ydl_opts = {
        "format": "best",
        "forceurl": "true",
        "simulate": "true",
        "noplaylist": "true",
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            ydl.download(source)
        except Exception as e:
            print(e)
