FROM node:18

MAINTAINER Maxim Zelenkin <nudepatch@gmail.com>

RUN apt update -q && apt install -y \
    nano > /dev/null

RUN npm i -g @vue/cli
RUN npm i -g json-server

ENV APP_PATH /app
RUN mkdir -p $APP_PATH
WORKDIR $APP_PATH

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
