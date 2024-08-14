FROM node:latest
LABEL authors="elliotwatson"

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5055

COPY . .

RUN npm run build

CMD ["npm", "start"]