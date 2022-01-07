# Build react app
FROM node:16.13.1-alpine as build

USER root

WORKDIR /app

# Copy only package files
COPY ./package*.json .

COPY ./public ./public

COPY ./src ./src


# Install production libraries
RUN npm i

RUN npm run build

# Copy build files into NGINX container for deployment
FROM nginx:1.21.5-alpine

# Copy build files to public dir
COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]