FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install  --legacy-peer-deps

# Copy the rest of the app
COPY . .


CMD ["npm", "start"]