# Car app ![language](https://img.shields.io/badge/language-javascript-blue.svg)

> Car_sales dashboard

A `simple` :zap: web dashboard to monitor your car sales!

## :books: Table of Contents

- [Installation](#package-installation)
- [Usage](#rocket-usage)
- [Database](#cloud-database)
- [Test](#memo-test)

## :package: Installation

### First check if you have Docker installed

Before installing this app you need to check if you have `Docker` installed on your computer.

To check if you have `Docker` installed, run this command in your terminal:

```sh
docker -v
```

If you get an answer like this, it means that `Docker` is installed and you may go to the [next section](#then-install-the-app).

```sh
Docker version 18.09.2
```

### Then install the App

Run the following command in your terminal 

```sh
docker-compose up --build
```

## :rocket: Usage

The app is all set up now, access it in your browser at `http://localhost:8000/`.

## :cloud: Database

To update the database, simply go into the `data` folder, replace `car_sales.csv` with your new file and restart with

```sh
docker-compose up --build
```
## :memo: Test

To test the API, first open your docker terminal with 

```sh
docker exec -it $your_container_name bash
```
then start the tests with 

```sh
npm run test
```

