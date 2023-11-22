FROM nginx:1.17

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d

COPY ./nginx/gen_htpasswd.sh /etc/nginx

RUN apt-get update
RUN apt-get install -y openssl

RUN sh /etc/nginx/gen_htpasswd.sh