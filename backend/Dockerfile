# -- BASE --
FROM node:16.13.1-alpine AS base

USER root

# Install Python and pip
RUN apk add --update python3 python3-dev py3-pip build-base

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt --ignore-installed

RUN apk add ffmpeg

WORKDIR /app/node_modules

WORKDIR /app

RUN chown -R node:node /app/node_modules

# Copy only package files as user node
COPY --chown=node:node package*.json ./

# Use node user so it's not run as root
USER node

# Install production libraries
RUN npm i

# -- RELEASE -- 
FROM base AS release
# Set copy app files as user node
COPY --chown=node:node . .

EXPOSE 3001

ENTRYPOINT ["node", "/app/app.js"]