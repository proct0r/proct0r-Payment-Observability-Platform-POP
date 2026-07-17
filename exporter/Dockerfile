# Download a small Linux system that already has Node.js installed
FROM node:22-alpine 

# Inside the container create app dir
WORKDIR /app

# copy dependency
COPY package*.json ./

# Install basic dependencies
RUN npm install

# copy your application code in to container
COPY . .

# application listens on port 9400
EXPOSE 9400

# When the container starts, run my application
CMD ["npm","start"]

