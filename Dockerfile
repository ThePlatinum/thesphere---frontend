FROM node:16.5
# RUN apt-get update
# RUN apt-get install -y python2
COPY . .
CMD ["yarn", "dev"]