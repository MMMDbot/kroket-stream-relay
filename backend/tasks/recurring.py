from redis import Redis
from rq import Queue
from rq_scheduler import Scheduler
from datetime import datetime
from thumbnails import thumbnail_generator

redis_conn = Redis("kroket-stream-relay_redis_1", 6379)
scheduler = Scheduler("recurring", connection=redis_conn)

scheduler.schedule(
    scheduled_time=datetime.utcnow(),  # Time for first execution, in UTC timezone
    func=thumbnail_generator,  # Function to be queued
    # args=["hola", "peinesito"],  # Arguments passed into function when executed
    interval=350,  # Time before the function is called again, in seconds
    repeat=None,  # Repeat this number of times (None means repeat forever)
)
