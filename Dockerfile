# Dockerfile para frontend Vite
FROM node:18

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 5177
CMD ["npm", "run", "dev"]
