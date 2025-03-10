FROM node:20  AS build

WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm run build

FROM node:20 
WORKDIR /app
COPY --from=build /app ./
EXPOSE 5000
CMD ["npm", "start", "--", "-p", "5000"]