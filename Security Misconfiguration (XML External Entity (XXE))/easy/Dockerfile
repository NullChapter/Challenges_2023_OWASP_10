FROM php:cli

COPY . ./app

WORKDIR ./app

EXPOSE 8004

ENTRYPOINT  ["php", "-S", "localhost:8004"]