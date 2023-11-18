# Use Alpine Linux with PHP 7.4
FROM php:7.4-alpine

# Install necessary packages for XML support
RUN apk --update add libxml2 libxml2-dev && \
    apk add php-xml 

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Expose port 80 to the outside world
EXPOSE 80
# Define the command to run your PHP script using the built-in server
CMD ["php", "-S", "0.0.0.0:80"]
