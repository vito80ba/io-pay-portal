# IO Pay Portal - frontend

The repository contains the code implementing IO Pay Portal frontend.

## About The Project

This project is a simple frontend that interacts with the services implemented in _io-functions-pay-portal_, and the goal is to verify and start a payment given a "Codice Avviso Pagamento". If the verification is successful, the app redirects to [io-pay](https://github.com/pagopa/io-pay).

### Built With

* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [Parcel](https://parceljs.org)
* [Typescript](https://www.typescriptlang.org)
* [Azure Pipeline](https://azure.microsoft.com)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

In order to build and run this project are required:

- [yarn](https://yarnpkg.com/)
- [node (>=10.18.0)](https://nodejs.org/it/)

### Configuration

The table below describes all the Environment variables needed by the application.

| Variable name | Description | type |
|----------------|-------------|------|
|IO\_PAY\_PORTAL\_FUNCTION| api services | endpoint/string

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/pagopa/io-pay-portal
   ```
2. Install node packages
   ```sh
   yarn install
   ```
3. Export env variables from .env.io-pay-portal.development
   ```JS
    export $(grep -v '^#' .env.io-pay-portal.development | xargs) && chmod +x env.sh && source env.sh
   ```

### Usage

In order to run the application on a local dev server:

1. Generate api client 
   ```sh
   yarn generate
   ```
2. Build 
   ```sh
   yarn build
3. tests 
   ```sh
   yarn test
   ```
4. Linter 
   ```sh
   yarn lint
4. Local dev server
   ```sh
   yarn dev
Then, point your browser to

- http://localhost:1234 

to reach the frontend.   

## Azure Pipeline

The CI/CD pipelines are defined in the _.devops_ folder. It is required to set the following variables on Azure DevOps:

- GIT_EMAIL
- GIT_USERNAME
- GITHUB_CONNECTION
- IO_PAY_PORTAL_FUNCTION
- PRODUCTION_AZURE_SUBSCRIPTION
- STAGING_AZURE_SUBSCRIPTION
- PRODUCTION_RESOURCE_GROUP_NAME
- PRODUCTION_CDN_ENDPOINT
- PRODUCTION_CDN_PROFILE_NAME