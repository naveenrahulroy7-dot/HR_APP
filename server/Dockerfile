# Multi-stage build for server + client

FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package.json client/package-lock.json* ./
RUN npm install --no-fund --no-audit || npm install --no-fund --no-audit
COPY client/ .
RUN npm run build

FROM node:20-alpine AS server-builder
WORKDIR /app/server
ENV NODE_ENV=production
COPY server/package.json server/package-lock.json* ./
RUN npm install --no-fund --no-audit || npm install --no-fund --no-audit
COPY server/ .
# Generate Prisma client and build TypeScript
RUN npx prisma generate && npm run build

FROM node:20-alpine AS runtime
WORKDIR /app/server
ENV NODE_ENV=production
ENV PORT=3001
# Create uploads directory for static files
RUN mkdir -p /app/server/uploads
# Copy server node_modules and dist
COPY --from=server-builder /app/server/node_modules ./node_modules
COPY --from=server-builder /app/server/dist ./dist
COPY --from=server-builder /app/server/prisma ./prisma
COPY --from=server-builder /app/server/package.json ./package.json
# Copy client build artifacts to be served by server
RUN mkdir -p /app/client/dist
COPY --from=client-builder /app/client/dist /app/client/dist
# Copy entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
EXPOSE 3001
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
