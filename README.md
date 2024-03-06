# DEMO APP BACKEND TASK

This is monorepo for my demo app.

The backend is done using Node.js/Express.js/Typescript with a use of routing-controllers and Jest/Supertest for unit testing. For database Sqlite with Sequileze as ORM were used.

The simple frontend is done via create-react-app/Typescript/Mobx.

All IDs were changes to hash UUIDV4 for the sake of security and ensuring uniqeness.

## Environment

Following files should be created in respective folders

`./api/.env`
PORT=5001
LOG_LEVEL=debug
DB_DIALECT=sqlite
DB_NAME=demo-db
DB_STORAGE=./database.sqlite3
 
and
 
`./ui/.env`
REACT_APP_API_URL=http://localhost:5001/api/v1

## Scripts
All scripts are available in the root package.json as well as more detailed in each folder (api/ui).

Run `npm run test` to run Jest test suite for API endpoints
Run `npm run seed`: to seed database, ideally to run it after first application run, because migration with table structures is syncing on app load.
Run `npm start` to install all dependiences and start both frontend and backend application in one command
