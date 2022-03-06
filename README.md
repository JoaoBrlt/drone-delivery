# Drone delivery

Course: Service-Oriented Architecture

Supervisors: N. Bounouas, P. Collet

Date: September 2021 - March 2022

## Description

Drone delivery is a system for planning and tracking drone deliveries. The goal was to design an efficient system to
graphically track drone deliveries in real time. Moreover, the system had to be able to track critical deliveries even
in areas partially covered by the network. Furthermore, the system had to be able to transmit drone tracking information
to air traffic management authorities when drones were flying over an urban area. For this purpose, we have chosen to
implement a service-oriented and event-driven architecture.

## Subject

**Subject:** Planning and graphical tracking of the delivery paths.

**Feature 1:** Track critical deliveries in real time, even in areas partially covered by the network.

**Feature 2:** Transmit tracking information in real time to external air traffic authorities when drones fly over their urban area.

## Structure

- [client](client): Client application (Angular, Angular Material, TypeScript).
- [services](services): Internal services (NestJS, TypeScript).
- [external](external): External services (NestJS, TypeScript).
- [tests](tests): Acceptance tests (Cucumber.js, TypeScript).
- [demo](demo): Demonstration script (Python).
- [postman](postman): Postman collection and environment.
- [docs](docs): Project documentation.

## Requirements

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Prepare

- Prepare the dependencies:

```bash
./prepare.sh
```

## Run

- Run the project:

```bash
./run.sh
```

## Stop

- Stop the project:

```bash
./stop.sh
```

## Authors

- [João Brilhante](https://github.com/JoaoBrlt)
- [Enzo Briziarelli](https://github.com/enbriziare)
- [Charly Ducrocq](https://github.com/CharlyDucrocq)
- [Quentin Larose](https://github.com/QuentinLarose)
- [Ludovic Marti](https://github.com/LudovicMarti)

## License

This project is licensed under the GPLv3 License - see the [LICENSE](LICENSE) file for details.
