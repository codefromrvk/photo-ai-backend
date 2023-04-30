# LTS Alpine v16.18.0
FROM node:16.18.0 as build

# Create app directory
#TODO: Change this to /yourAppName
WORKDIR /node-backend-ts

# Install app dependencies
COPY package.json ./package.json

RUN yarn install

# Copy all files to container
COPY . .
RUN yarn build

ADD ./deployment_config/scripts/entrypoint.sh ./
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
