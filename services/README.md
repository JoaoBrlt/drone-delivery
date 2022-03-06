# Services

## Structure

- [alert-handler](alert-handler): Receives alerts from the drones.
- [alert-router](alert-router): Routes alerts to the client.
- [authority-communication](authority-communication): Forwards drone positions to air traffic authorities.
- [delivery-pathfinder](delivery-pathfinder) (Mock): Computes delivery paths.
- [delivery-scheduler](delivery-scheduler) (Mock): Schedules deliveries.
- [drone-controller](drone-controller) (Mock): Sends commands to the drones.
- [drone-heartbeat](drone-heartbeat): Receives tracking information from the drones.
- [drone-registry](drone-registry): Stores information about the drones on delivery.
- [ghost-ping-generator](ghost-ping-generator): Interpolates the position of drones that stopped emitting. 
- [tracking-analyser](tracking-analyser): Analyzes tracking information to detect drone issues.
- [tracking-router](tracking-router): Routes tracking information to the client.
- [weather-analyser](weather-analyser): Analyzes the weather to improve delivery scheduling and avoid casualties.

## Authors

- [João Brilhante](https://github.com/JoaoBrlt)
- [Enzo Briziarelli](https://github.com/enbriziare)
- [Charly Ducrocq](https://github.com/CharlyDucrocq)
- [Quentin Larose](https://github.com/QuentinLarose)
- [Ludovic Marti](https://github.com/LudovicMarti)
