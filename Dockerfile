FROM node:14

EXPOSE 3000

WORKDIR /src

RUN npm install i npm@latest -g

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

RUN npm test || exit 1

CMD node backend/src/index.js