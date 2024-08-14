# Indigov Take-Home

## Installation and Running the Project

To run the project, you'll need Docker and Docker Compose installed on your system.

1. Once you are in the top level of the project folder run:

```bash
docker-compose up --build
```

This command will build the necessary Docker images and start the services.
- The TypeScript code will be compiled into JS within the build folder.
- The Node.js server will run on port 5055.
- Note that the PostgreSQL server will run on port 5422 to avoid conflicts with any existing PostgreSQL instances that may be running on port 5432.
    - The necessary relations and some sample data should be made ready via the [SQL file](./initialize.sql) upon initialization of the Postgres docker image.

## Usage

Once the services are up and running, you can access the Node.js HTTP server at http://localhost:5055.

### Get All Constituents
```curl localhost:5055/constituents```

### Add Constituent
```curl --location 'localhost:5055/constituent' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Elliot Watson",
    "email": "elliot.watson1@gmail.com",
    "address": "my address"
}'
```

### Export Constituent CSV
Note: when running the node.js server via docker, the CSV file will be saved to the docker filesystem.
```curl --location --request GET 'localhost:5055/constituents/csv' \
--header 'Content-Type: application/json' \
--data '{
    "startDate": "2023/01/01",
    "endDate": "2025/01/01"
}'
```

### Import Constituent CSV
Note: csv should not include a header row, and only three columns, the order of which should be email, name, address.
```
curl --location 'localhost:5055/constituents/csv' \
--header 'Content-Type: text/csv' \
--data 'constituent_import.csv'
```