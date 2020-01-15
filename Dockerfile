FROM node:10-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache \
        python \
        make \
        g++

COPY package*.json ./

RUN npm install

COPY . .

# final image
FROM node:10-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache ffmpeg
COPY --from=0 /usr/src/app /usr/src/app

CMD [ "npm", "start" ]
