FROM nginx:latest
COPY ./dist/kitamoto-otomatik-admin-ui/ /usr/share/nginx/html
EXPOSE 80
