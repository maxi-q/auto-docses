FROM node:18-alpine as build
ENV API_URL=http://backend:8000/api/
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD cp -r build result_build
