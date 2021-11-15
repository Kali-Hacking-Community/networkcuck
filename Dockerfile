FROM kalilinux/kali-rolling

RUN apt-get update -y && \
    apt-get install curl gnupg nmap -y

RUN curl --silent --location https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install nodejs -y

RUN npm i -g npm

ENV NODE_ENV production

WORKDIR /root/app
COPY . .

RUN npm i

ENTRYPOINT ["npm", "run", "docker"]