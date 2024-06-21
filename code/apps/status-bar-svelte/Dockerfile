FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i -g pnpm && pnpm install

COPY . .

ENV NODE_ENV=production

EXPOSE 2424

RUN pnpm run build -- --mode production

CMD ["pnpm", "vite", "preview", "--host"]