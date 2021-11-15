# Network Cuck

## Description

Custom bot for KHC Discord server, in honor of the one and only Network Chuck!

## Install Instructions

### Production (pm2)

_Requirements_:

- nodejs
- pm2

1. Make sure requirements are installed globally
2. Make the `.env` file at the root of the project, add env variables as need for the `config/index.js` file.
3. Run the project with `npm start`

### Production (docker)

_Requirements_:

- docker

1. Make sure requirements are installed.
2. Make the `.env` file at the root of the project, add env variables as need for the `config/index.js` file.
3. `chmod +x docker_run.sh` to give the install script permission to execute.
4. `./docker_run.sh` to automatically build and run the docker image.
