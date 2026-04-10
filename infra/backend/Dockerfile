FROM php:8.4-fpm
RUN apt-get update && apt-get install -y git unzip
RUN docker-php-ext-install pdo_mysql
COPY --from=composer:2.9.5 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html