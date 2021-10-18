# Kata Bingo Backend


## Development mode
  - Running project
    ```
      yarn dev
    ```

## Production mode
- Build project
    ```sh
    yarn build
    ```
- Start project
    ```sh
    yarn start
    ```

## Endpoints

- Start game [GET] [/api/v1/bingo/start]

- Create Card [GET] [/api/v1/bingo/create/bingo-card]

- Generate Number [GET] [/api/v1/bingo/generate-number]

- Validate card by id [GET] [/api/v1/bingo/validate/card/:id]

- Validate all cards [GET] [/api/v1/bingo/validate/cards]