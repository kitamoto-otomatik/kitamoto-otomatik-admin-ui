FROM nginx:latest
COPY ./dist/kitamoto-otomatik-admin-ui/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
