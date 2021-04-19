FROM debian:stable
SHELL ["/bin/bash", "-c"]

ENV NVM_DIR /usr/local/nvm
RUN mkdir -p /usr/local/nvm
RUN mkdir -p /app/dist

RUN apt-get update
RUN apt-get install -y procps curl nginx 
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash
RUN source ~/.bashrc
WORKDIR /app/

COPY ./.nvmrc /app/
RUN source ~/.bashrc \
	&& nvm --version \
	&& nvm install

COPY config/nginx_default /etc/nginx/sites-available/default 
EXPOSE 1884

ENTRYPOINT ["nginx", "-g", "daemon off;"]
