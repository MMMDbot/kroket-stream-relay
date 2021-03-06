from rq import Queue
from rq.command import send_stop_job_command
from rq.job import Job
from rq.exceptions import NoSuchJobError, InvalidJobOperation
from redis import Redis
import os
import time
import ffmpeg
import yt_dlp
from tenacity import (
    retry,
    stop_after_attempt,
    retry_if_exception_type,
    wait_random,
    retry_unless_exception_type,
    Retrying,
    RetryError,
)
import sys
from errorHandlers import ingest_error_handler, relay_error_handler
import requests


def yt(url):
    ydl_opts = {
        "format": "best/bestvideo+bestaudio",
        "forceurl": "true",
        "simulate": "true",
        "quiet": "true",
    }
    try:
        for attempt in Retrying(
            stop=stop_after_attempt(2), wait=wait_random(min=5, max=10)
        ):
            with attempt:
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, process=False)
                    #    info_json = json.dumps(ydl.sanitize_info(info))
                    #    info2_json = json.loads(info_json)
                    # print(info2_json["formats"][-1]["url"])
                    return info["formats"][-1]["url"]
    except RetryError:
        raise YtdlpError


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
    """Raised when converting YouTube URL to HLS playlist is not successful"""

    def __str__(self):
        return "Yt-dlp error!"

    pass


class LongEncodeError(Error):
    """Raised when FFMPEG encoding has been running for more than 1 hour"""

    def __str__(self):
        return "Long Encode Error!"

    pass


class ShortEncodeError(Error):
    """Raised when FFMPEG encoding has been running for less than 1 hour"""

    def __str__(self):
        return "Short Encode Error!"

    pass


class EncodingCatastrophe(Error):
    """Raised when more than 10 retries have been made in less than an hour"""

    def __str__(self):
        return "Catastrophic encoding error!"

    pass


@retry(retry=retry_if_exception_type(YtdlpError))
def retryTest():
    t = time.perf_counter()
    time.sleep(2)
    elapsed_time = time.perf_counter() - t
    if elapsed_time < 18:
        print(elapsed_time)
        print(retryTest.retry.statistics["attempt_number"])
        raise YtdlpError
    else:
        raise Error


# @retry(stop=stop_after_attempt(4))
# @retry(
#    retry=(
#        retry_unless_exception_type(EncodingCatastrophe)
#        & retry_unless_exception_type(YtdlpError)
#    ),
#    wait=wait_random(min=5, max=10),
# )
def streamHLS(id, origin):
    VIDEO_URL = origin
    RTMP_SERVER = "rtmp://publish.dailymotion.com/publish-dm/x7t01a2?auth=dIJL_2c32466412bd2c7dd5ba696eae070e1f3481b6e2"

    if not ("d1qvkrpvk32u24" in origin):
        try:
            hls_playlist = yt(origin)
        except YtdlpError as e:
            print(e)
            raise YtdlpError from None
    else:
        hls_playlist = origin

    current_directory = "/app/public/streams/"
    playlist_path = os.path.join(current_directory, id, "stream.m3u8")
    chunk_path = os.path.join(current_directory, id, "data%02d.ts")
    print(playlist_path)
    print(chunk_path)

    time_start = time.perf_counter()
    try:
        # Generate Thumbnail
        url_thumbnail = "http://kroket-stream-relay_api_1:3001/api/thumbnail/" + id
        r_thumbnail = requests.get(url=url_thumbnail)
        r_thumbnail_json = r_thumbnail.json()
        print(r_thumbnail_json)
        stream_map = None
        # Trying to fix playback issue 'Skipping fragments ahead' by removing re=None
        # stream1 = ffmpeg.input(hls_playlist re=None)
        stream1 = ffmpeg.input(hls_playlist)
        stream2 = ffmpeg.input("mosca_66.png")
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
        elapsed_time = time.perf_counter() - time_start
        if elapsed_time > 3600:
            print(elapsed_time)
            raise LongEncodeError
        elif streamHLS.retry.statistics["attempt_number"] > 10:
            raise EncodingCatastrophe
        else:
            print(streamHLS.retry.statistics["attempt_number"])
            print(elapsed_time)
            print("stdout:", e.stdout.decode("utf8"))
            print("stderr:", e.stderr.decode("utf8"))
            print(e)
            raise ShortEncodeError


# streamHLS("fff", "https://www.youtube.com/watch?v=5qap5aO4i9")


def relay(ingestId, relayId, server, streamKey):
    VIDEO_URL = "https://d1qvkrpvk32u24.cloudfront.net/RL/smil:EU-a62d3276-f807-46e3-97b8-af4501d7f17a.smil/playlist.m3u8"
    RTMP_SERVER = "rtmp://publish.dailymotion.com/publish-dm/x7t01a2?auth=dIJL_2c32466412bd2c7dd5ba696eae070e1f3481b6e2"

    current_directory = "/app/public/streams/"
    playlist_path = os.path.join(current_directory, ingestId, "stream.m3u8")
    chunk_path = os.path.join(current_directory, ingestId, "data%02d.ts")
    target = server + streamKey

    try:
        stream1 = ffmpeg.input(playlist_path)
        stream = ffmpeg.output(
            stream1,
            target,
            format="flv",
            codec="copy",
        )
        subp = ffmpeg.run(stream)
        # Trigger errorHandler here in case stream ends successfuly to bring relay back to original status
        relay_error_handler(relayId)

    except ffmpeg.Error as e:
        print("stdout:", e.stdout.decode("utf8"))
        print("stderr:", e.stderr.decode("utf8"))
        relay_error_handler(relayId)
        raise EncodingCatastrophe


def secondTask(arg):
    print("hola")
    time.sleep(1)
    print(arg)
    time.sleep(1)
    print("adios")
    return "completado"


def startQueue(id, origin):
    redis_conn = Redis("kroket-stream-relay_redis_1", 6379)
    print("id is")
    print(id)
    print("origin is")
    print(origin)
    q = Queue("ingest", connection=redis_conn)  # no args implies the default queue

    # Delay execution of count_words_at_url('http://nvie.com')
    # job = q.enqueue(createDir, arg)
    # job = q.enqueue(streamVideo)
    # job = q.enqueue(streamVideo)
    job = q.enqueue(streamHLS, id, origin, job_id=id, job_timeout=-1)
    print(job.result)
    print(job.exc_info)  # => None
    time.sleep(11)
    job_status = Job.fetch(id, connection=redis_conn)
    print(job_status.result)
    print(job_status.exc_info)


def startRelay(ingestId, relayId, server, streamKey):
    redis_conn = Redis("kroket-stream-relay_redis_1", 6379)
    q = Queue("relay", connection=redis_conn)  # no args implies the default queue

    # Delay execution of count_words_at_url('http://nvie.com')
    # job = q.enqueue(createDir, arg)
    # job = q.enqueue(streamVideo)
    # job = q.enqueue(streamVideo)
    job = q.enqueue(
        relay, ingestId, relayId, server, streamKey, job_id=relayId, job_timeout=-1
    )
    print(job.result)  # => None
    # time.sleep(5)
    print(job.result)


def stop(id):
    redis_conn = Redis("kroket-stream-relay_redis_1", 6379)
    try:
        send_stop_job_command(redis_conn, id)
    except (NoSuchJobError, InvalidJobOperation) as e:
        print(e)
    # If stream is manually stopped, trigger error handler to update DB
    if len(id) == 9:
        ingest_error_handler(id)
    elif len(id) == 14:
        relay_error_handler(id)
