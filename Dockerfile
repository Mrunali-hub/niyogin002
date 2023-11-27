# Dockerfile
FROM node:14.15.4

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# Add ngnix
RUN apt-get update
RUN apt-get install -y --no-install-recommends \
        libatlas-base-dev gfortran nginx supervisor
RUN useradd --no-create-home nginx
#RUN rm /etc/nginx/sites-enabled/default
#RUN rm -r /root/.cache
COPY server-conf/ui-client /etc/nginx/sites-enabled/


# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build

#ENV HOST 0.0.0.0
#ENV PORT 3000
#ENV HOST http://dev-api.commicado.io
CMD [ "npm", "start" ]
