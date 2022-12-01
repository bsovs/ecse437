FROM node:16-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev --ignore-scripts
RUN npm install --production --ignore-scripts

COPY . .

CMD ["npm", "start"]
