FROM mongo

RUN mkdir -p /data/db \
    && chown -R mongodb:mongodb /data/db \
    && echo "security:\n  authorization: enabled" >> /etc/mongod.conf

# This file will be execute on start up
COPY ./create_admin.sh /docker-entrypoint-initdb.d/

CMD ["mongod", "--bind_ip_all"]

FROM node:18.16.0-alpine3.16

RUN apk add --no-cache python3 g++ make

COPY . /app

WORKDIR /app/server

RUN npm install

CMD ["npm", "run", "start"]