from datetime import datetime
from drone_heartbeat import send_drone_heartbeat


def get_drone_positions():
    return [
        {
            'latitude': 43.66104,
            'longitude': 7.16737
        },
        {
            'latitude': 43.66588,
            'longitude': 7.17407
        },
        {
            'latitude': 43.67060,
            'longitude': 7.18008
        },
        {
            'latitude': 43.67606,
            'longitude': 7.18763
        },
        {
            'latitude': 43.68028,
            'longitude': 7.19381
        },
        {
            'latitude': 43.68500,
            'longitude': 7.20085
        },
        {
            'latitude': 43.69009,
            'longitude': 7.20926
        },
        {
            'latitude': 43.69605,
            'longitude': 7.21767
        },
        {
            'latitude': 43.69716,
            'longitude': 7.22694
        }
    ]


def first_demo(step):
    positions = get_drone_positions()

    if step < len(positions):
        now = datetime.utcnow()
        position = positions[step]
        heartbeat = {
            'droneId': 1,
            'deliveryId': 'DE-254DA',
            'isCritical': True,
            'status': 'OK',
            'latitude': position['latitude'],
            'longitude': position['longitude'],
            'altitude': 100,
            'date': now.strftime("%Y-%m-%dT%H:%M:%S.000Z")
        }

        send_drone_heartbeat(heartbeat)
