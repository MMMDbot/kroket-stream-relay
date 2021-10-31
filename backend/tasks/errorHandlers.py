import requests


def error_handler(job, exc_type, exc_value, traceback):
    url_db = "http://localhost:3001/api/setoffline/" + job.id
    url_socket = "http://localhost:3001/socket/ingest/" + job.id + "/offline"

    r_db = requests.get(url=url_db)
    r_socket = requests.get(url=url_socket)

    r_db_json = r_db.json()
    r_socket_json = r_socket.json()

    r_db_message = r_db_json["message"]
    r_socket_message = r_socket_json["message"]

    print(r_db_message)
    print(r_socket_message)
