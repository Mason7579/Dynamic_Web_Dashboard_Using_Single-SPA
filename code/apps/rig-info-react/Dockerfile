FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i -g pnpm && pnpm install

COPY . .

EXPOSE 8500

RUN pnpm run build

CMD ["pnpm", "run", "start:standalone"]