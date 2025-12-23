# Stage 1 — install dependencies
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy package manifests and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Stage 2 — runtime image
FROM node:18-alpine
WORKDIR /usr/src/app

# Copy installed modules + app from builder
COPY --from=builder /usr/src/app /usr/src/app

# Use non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /usr/src/app

USER appuser

# Recommended production env defaults (can be overridden by docker run)
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the app — use `node app.js` (your project uses `app.js` as main)
CMD ["node", "app.js"]