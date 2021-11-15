import requests


def ingest_error_handler(job):
    try:
        job_id = job.id
    except Exception as e:
        job_id = job

    url_db = "http://localhost:3001/api/setoffline/" + job_id
    url_socket = "http://localhost:3001/socket/ingest/" + job_id + "/offline"

    r_db = requests.get(url=url_db)
    r_socket = requests.get(url=url_socket)

    r_db_json = r_db.json()
    r_socket_json = r_socket.json()

    r_db_message = r_db_json["message"]
    r_socket_message = r_socket_json["message"]

    print(r_db_message)
    print(r_socket_message)


def relay_error_handler(job):
    try:
        job_id = job.id
    except Exception as e:
        job_id = job

    url_db = "http://localhost:3001/api/setoffline/relay/" + job_id
    url_socket = "http://localhost:3001/socket/relay/" + job_id + "/offline"

    r_db = requests.get(url=url_db)
    r_socket = requests.get(url=url_socket)

    r_db_json = r_db.json()
    r_socket_json = r_socket.json()

    r_db_message = r_db_json["message"]
    r_socket_message = r_socket_json["message"]

    print(r_db_message)
    print(r_socket_message)
