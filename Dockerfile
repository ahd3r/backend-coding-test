# Specify a base image
FROM node

WORKDIR /app

COPY ./package.json .
RUN npm i --loglevel verbose

COPY . .
RUN npm run build

# Default command
CMD ["npm", "run", "start-prod"]
