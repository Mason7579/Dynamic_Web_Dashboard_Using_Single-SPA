FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i -g pnpm && pnpm install

COPY . .

ENV NODE_ENV=production

EXPOSE 9005

RUN pnpm run build

CMD ["pnpm", "run", "start:standalone"]