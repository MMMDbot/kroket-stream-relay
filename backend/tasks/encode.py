from rq import Queue
from redis import Redis
import os
import time
import ffmpeg


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


def streamHLS(id):
    VIDEO_URL = "https://d1qvkrpvk32u24.cloudfront.net/RL/smil:EU-e9817a36-e54a-484a-95dd-4eefcfad87bc.smil/chunklist_b2048000.m3u8"
    RTMP_SERVER = "rtmp://publish.dailymotion.com/publish-dm/x7t01a2?auth=dIJL_2c32466412bd2c7dd5ba696eae070e1f3481b6e2"

    current_directory = "/home/square/kroket-stream-relay/backend/public/streams/"
    playlist_path = os.path.join(current_directory, id, "stream.m3u8")
    chunk_path = os.path.join(current_directory, id, "data%02d.ts")

    try:
        stream_map = None
        stream1 = ffmpeg.input(VIDEO_URL, re=None)
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
        subp = ffmpeg.run(
            stream, cmd="/usr/bin/ffmpeg", capture_stdout=True, capture_stderr=True
        )

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


def startQueue(id):
    redis_conn = Redis("localhost", 6379)
    q = Queue("default", connection=redis_conn)  # no args implies the default queue

    # Delay execution of count_words_at_url('http://nvie.com')
    # job = q.enqueue(createDir, arg)
    # job = q.enqueue(streamVideo)
    # job = q.enqueue(streamVideo)
    job = q.enqueue(streamHLS, id, job_timeout=-1)
    print(job.result)  # => None
    time.sleep(5)
    print(job.result)
