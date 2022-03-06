import requests


def send_drone_heartbeat(heartbeat):
    r = requests.post('http://localhost:4000/drone-heartbeat/send', json=heartbeat)
    if 200 <= r.status_code < 300:
        print('Sent drone heartbeat')
    else:
        print('Error', r.status_code)
