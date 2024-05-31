FROM node:20

WORKDIR /usr/app/frontend

RUN npm install -g pnpm

COPY package.json .

RUN pnpm install

COPY . .

CMD ["pnpm", "run", "dev"]