import requests


def create_drone_assignment(assignment):
    r = requests.post('http://localhost:3002/scheduler/create', json=assignment)
    if 200 <= r.status_code < 300:
        print('Created drone assignment')
    else:
        print('Error', r.status_code)
