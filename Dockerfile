FROM node:16
WORKDIR /usr/src/app

COPY . .
RUN npm install

## Web
EXPOSE 3000
## API
EXPOSE 3001

CMD npm run start-all
