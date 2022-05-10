# Uphold Assessment Challenge

This app is a bot to send notifications when having currency oscillations.

## Index

- [Usage](#usage)
- [Technologies](#technologies)
- [Acceptance criteria](#acceptance-criteria)

## Usage

To install all packages use the command:

```bash
yarn install
```

To run unit tests:

```bash
yarn test
```

To run the development server use:

This command will create a container for the app and another container for the postgres and will run typeorm migration

```bash
docker-compose up -d
```

To see notification logs use:

```bash
docker logs uphold_challenge --tail 50 -f
```

This app run on port 3000.

To check the app health:

```bash
curl --location --request GET 'http://localhost:3000/api/'
```

To find all notifications:

```bash
curl --location --request GET 'http://localhost:3000/api/notificator/find'
```

To find notifications by Currency Pair:

```bash
curl --location --request GET 'http://localhost:3000/api/notificator/findByCurrencyPair?currencyPair=EUR-USD'
```

## Technologies

- [NestJS](https://nestjs.com/)
- [Postgres](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) protocol to better organize my commits. I also used [Husky](https://github.com/typicode/husky) to add pre-commit lints and checks.

## Acceptance criteria

[x] **PHASE 1 (Mandatory):**

- You must create a README.md file in your project root explaining how we can run the bot. Make sure to include all the necessary set up and execution, and avoid implicit prerequisites.

- You must connect to Uphold public ticker and retrieve the BTC-USD rate every 5 seconds. Each time you retrieve a new rate, the bot must compare it with the first one and decide if it should alert of an oscillation. For the purpose of this exercise we want to be alerted (a simple log if sufficient) if the price changes 0.01 percent in either direction (price goes up or down).

[x] **PHASE 2 (Optional):**

- Handle multiple currency pairs at the same time.

- Accept all the parameters (currency pairs, fetch interval, price oscillation percentage, etc.) as arguments.

- Create a test suite for your code (e.g. jest or mocha).

[x] **PHASE 3 (Bonus):**

- Dockerize your application.

- Create a database to store all the alerts generated (e.g. Postgres).
  Persist all the information that you consider relevant (e.g. timestamps, rate, bot configuration at the time of the alert, etc.)
