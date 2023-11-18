FROM php:cli

COPY . ./app

WORKDIR ./app

EXPOSE 8005

ENTRYPOINT  ["php", "-S", "localhost:8005"]