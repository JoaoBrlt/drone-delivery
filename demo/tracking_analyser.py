import requests


def change_tracking_config(config):
    r = requests.post('http://localhost:3007/tracking-analyser/config-test', json=config)
    if 200 <= r.status_code < 300:
        print('Changed tracking analyser config')
    else:
        print('Error', r.status_code)
