# Specify a base image
FROM node

WORKDIR /app

COPY . .

# Install some deps
RUN npm i

# Default command
CMD ["npm", "run", "start-prod"]