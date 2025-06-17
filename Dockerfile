# Gunakan Node.js versi 18.20.8 (semirip mungkin dengan env dev lokal)
FROM node:18.20.8-alpine

# Set working directory
WORKDIR /app

# Copy hanya file dependency terlebih dahulu untuk caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code ke dalam container
COPY . .

# Set environment variable agar tidak menjalankan dalam dev mode
ENV NODE_ENV=production

# Expose port 4000 (port yang digunakan oleh server.js)
EXPOSE 3000

# Jalankan server.js (pastikan package.json sudah punya script "start": "node server.js")
CMD ["npm", "start"]
