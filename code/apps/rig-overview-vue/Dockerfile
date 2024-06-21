FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i -g pnpm && pnpm install

COPY . .

EXPOSE 5151

RUN pnpm run build -- --mode production

CMD ["pnpm", "vite", "preview", "--host"]