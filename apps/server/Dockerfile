FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 --ingroup nodejs hono

# We expect the build to be done on the host
COPY apps/server/dist /app/dist

USER hono

CMD ["node", "/app/dist/server.mjs"]
