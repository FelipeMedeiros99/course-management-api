FROM node:lts-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["sh", "-c", "npm run db:deploy && npm start"]

# FROM node:20

# WORKDIR /app

# COPY package*.json . 

# RUN npm install 

# COPY . . 

# RUN wait-for-it postgres:5432 -- npx prisma migrate deploy

# RUN npx prisma generate 

# RUN npm run build 

# CMD [ "npm", "run", "start:prod" ]