from rq import Queue
from rq.command import send_stop_job_command
from redis import Redis
import os
import time
import ffmpeg
import yt_dlp
from tenacity import retry, stop_after_attempt, retry_if_exception_type


def yt(url):
    ydl_opts = {
        "format": "best/bestvideo+bestaudio",
        "forceurl": "true",
        "simulate": "true",
        "quiet": "true",
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, process=False)
    #    info_json = json.dumps(ydl.sanitize_info(info))
    #    info2_json = json.loads(info_json)
    # print(info2_json["formats"][-1]["url"])
    return info["formats"][-1]["url"]


def createDir(dir):
    print(dir)
    current_directory = "/home/square/python-shell-test/"

    path = os.path.join(current_directory, dir)

    os.mkdir(path)
    return "done"


def streamVideo():
    VIDEO_URL = "https://d1qvkrpvk32u24.cloudfront.net/RL/smil:EU-e9817a36-e54a-484a-95dd-4eefcfad87bc.smil/chunklist_b2048000.m3u8"
    RTMP_SERVER = "rtmp://publish.dailymotion.com/publish-dm/x7t01a2?auth=dIJL_2c32466412bd2c7dd5ba696eae070e1f3481b6e2"

    try:
        stream_map = None
        stream1 = ffmpeg.input(VIDEO_URL, re=None)
        stream2 = ffmpeg.input("mosca_66.png")
        stream_ol = ffmpeg.overlay(stream1, stream2, x="main_w-overlay_w-50", y="50")
        a1 = stream1.audio
        stream = ffmpeg.output(
            stream_ol,
            a1,
            RTMP_SERVER,
            format="flv",
            vcodec="libx264",
            acodec="aac",
            preset="medium",
            g="120",
            crf="23",
            maxrate="4M",
            bufsize="5M",
            channel_layout="stereo",
        )
        subp = ffmpeg.run(
            stream, cmd="/usr/bin/ffmpeg", capture_stdout=True, capture_stderr=True
        )

    except ffmpeg.Error as e:
        print("stdout:", e.stdout.decode("utf8"))
        print("stderr:", e.stderr.decode("utf8"))
        raise e


class Error(Exception):
    """Base class for other exceptions"""

    pass


class YtdlpError(Error):
    """Raised when the input value is too small"""

    pass


@retry(retry=retry_if_exception_type(YtdlpError))
def retryTest():
    t = time.perf_counter()
    time.sleep(7)
    elapsed_time = time.perf_counter() - t
    if elapsed_time > 8:
        print(elapsed_time)
        raise YtdlpError
    else:
        raise Error


# @retry(stop=stop_after_attempt(4))
@retry(retry=retry_if_exception_type(YtdlpError))
def streamHLS(id, origin):
    VIDEO_URL = origin
    RTMP_SERVER = "rtmp://publish.dailymotion.com/publish-dm/x7t01a2?auth=dIJL_2c32466412bd2c7dd5ba696eae070e1f3481b6e2"

    try:
        hls_playlist = yt(origin)
    except Error:
        print("ytdlperror")
        raise YtdlpError

    current_directory = "/home/square/kroket-stream-relay/backend/public/streams/"
    playlist_path = os.path.join(current_directory, id, "stream.m3u8")
    chunk_path = os.path.join(current_directory, id, "data%02d.ts")

    try:
        stream_map = None
        stream1 = ffmpeg.input(hls_playlist, re=None)
        stream2 = ffmpeg.input("mosca_76.png")
        stream_ol = ffmpeg.overlay(stream1, stream2, x="main_w-overlay_w-50", y="50")
        a1 = stream1.audio
        stream = ffmpeg.output(
            stream_ol,
            a1,
            playlist_path,
            format="hls",
            sc_threshold="0",
            hls_time="6",
            hls_list_size="5",
            hls_flags="delete_segments",
            hls_segment_type="mpegts",
            hls_segment_filename=chunk_path,
            vcodec="libx264",
            acodec="aac",
            preset="medium",
            g="50",
            r="25",
            video_bitrate="6M",
            maxrate="6M",
            bufsize="3M",
            channel_layout="stereo",
        )
        subp = ffmpeg.run(stream, capture_stdout=True, capture_stderr=True)

    except ffmpeg.Error as e:
        print("stdout:", e.stdout.decode("utf8"))
        print("stderr:", e.stderr.decode("utf8"))
        print(e)
        raise e


def relay(id, server, streamKey):
    VIDEO_URL = "https://d1qvkrpvk32u24.cloudfront.net/RL/smil:EU-a62d3276-f807-46e3-97b8-af4501d7f17a.smil/playlist.m3u8"
    RTMP_SERVER = "rtmp://publish.dailymotion.com/publish-dm/x7t01a2?auth=dIJL_2c32466412bd2c7dd5ba696eae070e1f3481b6e2"

    current_directory = "/home/square/kroket-stream-relay/backend/public/streams/"
    playlist_path = os.path.join(current_directory, id, "stream.m3u8")
    chunk_path = os.path.join(current_directory, id, "data%02d.ts")
    target = server + streamKey

    try:
        stream1 = ffmpeg.input(playlist_path)
        stream = ffmpeg.output(
            stream1,
            target,
            format="flv",
            codec="copy",
        )
        subp = ffmpeg.run(stream, capture_stdout=True, capture_stderr=True)

    except ffmpeg.Error as e:
        print("stdout:", e.stdout.decode("utf8"))
        print("stderr:", e.stderr.decode("utf8"))
        raise e


def secondTask(arg):
    print("hola")
    time.sleep(1)
    print(arg)
    time.sleep(1)
    print("adios")
    return "completado"


def startQueue(id, origin):
    redis_conn = Redis("localhost", 6379)
    q = Queue("ingest", connection=redis_conn)  # no args implies the default queue

    # Delay execution of count_words_at_url('http://nvie.com')
    # job = q.enqueue(createDir, arg)
    # job = q.enqueue(streamVideo)
    # job = q.enqueue(streamVideo)
    job = q.enqueue(streamHLS, id, origin, job_id=id, job_timeout=-1)
    print(job.result)  # => None
    time.sleep(5)
    print(job.result)


def startRelay(id, relayId, server, streamKey):
    redis_conn = Redis("localhost", 6379)
    q = Queue("relay", connection=redis_conn)  # no args implies the default queue

    # Delay execution of count_words_at_url('http://nvie.com')
    # job = q.enqueue(createDir, arg)
    # job = q.enqueue(streamVideo)
    # job = q.enqueue(streamVideo)
    job = q.enqueue(relay, id, server, streamKey, job_id=relayId, job_timeout=-1)
    print(job.result)  # => None
    time.sleep(5)
    print(job.result)


def stop(id):
    redis_conn = Redis("localhost", 6379)
    send_stop_job_command(redis_conn, id)
