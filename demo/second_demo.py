from datetime import datetime, timedelta
from delivery_scheduler import create_drone_assignment
from tracking_analyser import change_tracking_config
from drone_heartbeat import send_drone_heartbeat
from drone_registry import set_drone_as_ready, set_drone_as_done


def get_drone_positions():
    return [
        {
            'longitude': 7.267284393310547,
            'latitude': 43.7006130454538
        },
        {
            'longitude': 7.2447967529296875,
            'latitude': 43.69667260550319
        },
        {
            'longitude': 7.220764160156249,
            'latitude': 43.69145965716313
        },
        {
            'longitude': 7.197074890136719,
            'latitude': 43.6847566291653
        },
        {
            'longitude': 7.177848815917968,
            'latitude': 43.67929434880928
        },
        {
            'longitude': 7.122230529785156,
            'latitude': 43.65793702655821
        }
    ]


def second_demo(step):
    positions = get_drone_positions()

    if step < len(positions) + 3:
        now = datetime.utcnow()

        if step == 0:
            date = now - timedelta(minutes=5)
            create_drone_assignment({
                'droneId': 2,
                'deliveryId': 'DE-888AA',
                'date': date.strftime("%Y-%m-%dT%H:%M:%SZ"),
                'destination': '5 rue de l\'Hôtel-de-Ville, Villeneuve-Loubet'
            })

        elif step == 1:
            change_tracking_config({
                'reset': False,
                'timeout': 5000,
                'counterLimit': 5
            })

        elif step == 2:
            set_drone_as_ready(2)

        else:
            position = positions[step - 3]
            heartbeat = {
                'droneId': 2,
                'deliveryId': 'DE-888AA',
                'isCritical': True,
                'status': 'OK',
                'latitude': position['latitude'],
                'longitude': position['longitude'],
                'altitude': 100,
                'date': now.strftime("%Y-%m-%dT%H:%M:%SZ")
            }

            send_drone_heartbeat(heartbeat)

            if step - 3 == len(positions) - 1:
                set_drone_as_done(2)
