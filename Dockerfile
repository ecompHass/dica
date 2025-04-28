FROM node:18-alpine AS build

ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /app

COPY package*.json ./
RUN npm install || { echo 'Install failed'; exit 1; }

COPY . .
RUN ls -la /app/src
RUN npm run build || { echo 'Build failed'; exit 1; } 

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]