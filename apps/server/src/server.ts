import { serve } from "@hono/node-server";

import {
  captureException,
  getLogger,
  initSentryPlaceholder,
} from "@acme/observability";

import { env } from "./env";
import app from "./index";

const logger = getLogger({ service: "api-server" });
const sentry = initSentryPlaceholder({
  serviceName: "api-server",
  dsn: env.SENTRY_DSN,
  environment: env.SENTRY_ENVIRONMENT,
});

const server = serve(
  {
    fetch: app.fetch,
    port: env.PORT,
    hostname: env.HOST,
  },
  (info) => {
    const host = info.family === "IPv6" ? `[${info.address}]` : info.address;
    logger.info(
      {
        externalServerUrl: env.PUBLIC_SERVER_URL,
        internalServerUrl: `http://${host}:${info.port}`,
        publicWebUrl: env.PUBLIC_WEB_URL,
      },
      "Hono server is listening",
    );
  },
);

const shutdown = () => {
  logger.info("Shutting down server");
  server.close((error) => {
    if (error) {
      captureException(error, { phase: "shutdown" }, logger);
      sentry.captureException(error, { phase: "shutdown" });
    } else {
      logger.info("Server stopped gracefully");
    }
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("uncaughtException", (error) => {
  captureException(error, { phase: "uncaughtException" }, logger);
  sentry.captureException(error, { phase: "uncaughtException" });
});
process.on("unhandledRejection", (reason) => {
  captureException(reason, { phase: "unhandledRejection" }, logger);
  sentry.captureException(reason, { phase: "unhandledRejection" });
});
