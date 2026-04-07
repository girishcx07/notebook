import type { Bindings, Logger } from "pino";
import pino from "pino";

const rootLogger = pino({
  name: "acme-platform",
  level: process.env.LOG_LEVEL ?? "info",
  base: undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: [
      "authorization",
      "cookie",
      "headers.authorization",
      "headers.cookie",
      "req.headers.authorization",
      "req.headers.cookie",
    ],
    remove: true,
  },
});

export function getLogger(bindings?: Bindings) {
  return bindings ? rootLogger.child(bindings) : rootLogger;
}

export function captureException(
  error: unknown,
  context?: Record<string, unknown>,
  logger: Logger = rootLogger,
) {
  logger.error({ context, err: error }, "Unhandled application exception");
}

export function initSentryPlaceholder(options: {
  dsn?: string;
  environment?: string;
  logger?: Logger;
  release?: string;
  serviceName: string;
}) {
  const logger = options.logger ?? getLogger({ service: options.serviceName });

  if (!options.dsn) {
    logger.debug("Sentry placeholder disabled because no DSN was provided");
    return {
      captureException(error: unknown, context?: Record<string, unknown>) {
        logger.error(
          { context, err: error },
          "Captured exception without configured Sentry transport",
        );
      },
      enabled: false,
    };
  }

  logger.info(
    {
      environment: options.environment,
      release: options.release,
    },
    "Sentry placeholder configured; wire a transport before production rollout",
  );

  return {
    captureException(error: unknown, context?: Record<string, unknown>) {
      logger.error(
        { context, err: error },
        "Sentry placeholder captured an exception",
      );
    },
    enabled: true,
  };
}
