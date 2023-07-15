FROM node

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

COPY package.json .

EXPOSE 3000:3000

CMD ["pnpm", "dev"]


