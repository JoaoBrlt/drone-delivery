import requests


def set_drone_as_ready(droneId):
    r = requests.post('http://localhost:3003/drone-registry/' + str(droneId) + '/ready')
    if 200 <= r.status_code < 300:
        print('Set drone as ready')
    else:
        print('Error', r.status_code)


def set_drone_as_done(droneId):
    r = requests.post('http://localhost:3003/drone-registry/' + str(droneId) + '/done')
    if 200 <= r.status_code < 300:
        print('Set drone as done')
    else:
        print('Error', r.status_code)
