import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';

import { logger } from '@/lib/logger.server';

/**
 * Server Middleware for React Router routes.
 * Intercepts incoming requests (loaders and actions), logs duration and status.
 */
export async function requestLogger(
  { request }: { request: Request },
  next: () => Promise<Response>
): Promise<Response> {
  const start = performance.now();
  const url = new URL(request.url);

  logger.info(`--> [${request.method}] ${url.pathname}${url.search}`);

  try {
    const response = await next();
    const duration = (performance.now() - start).toFixed(2);
    logger.info(`<-- [${request.method}] ${url.pathname} ${response.status} (${duration}ms)`);
    return response;
  } catch (error) {
    const duration = (performance.now() - start).toFixed(2);
    logger.error(`<!- [${request.method}] ${url.pathname} Error (${duration}ms)`, { error });
    throw error;
  }
}

/**
 * Higher-Order Action Logger Wrapper.
 * Wrap any React Router action function to log parameters, execution time, and errors.
 *
 * Example:
 * ```ts
 * export const action = withActionLogger('updateProfile', async ({ request }) => {
 *   // action logic...
 * });
 * ```
 */
export function withActionLogger<T>(
  actionName: string,
  handler: (args: ActionFunctionArgs) => Promise<T> | T
) {
  return async (args: ActionFunctionArgs): Promise<T> => {
    const start = performance.now();
    const url = new URL(args.request.url);

    logger.info(`--> [Action:${actionName}] ${args.request.method} ${url.pathname}`);

    try {
      const result = await handler(args);
      const duration = (performance.now() - start).toFixed(2);
      logger.info(`<-- [Action:${actionName}] Success (${duration}ms)`);
      return result;
    } catch (error) {
      const duration = (performance.now() - start).toFixed(2);
      logger.error(`<!- [Action:${actionName}] Error (${duration}ms)`, { error });
      throw error;
    }
  };
}

/**
 * Higher-Order Loader Logger Wrapper.
 * Wrap any React Router loader function to log execution time and errors.
 */
export function withLoaderLogger<T>(
  loaderName: string,
  handler: (args: LoaderFunctionArgs) => Promise<T> | T
) {
  return async (args: LoaderFunctionArgs): Promise<T> => {
    const start = performance.now();
    const url = new URL(args.request.url);

    logger.info(`--> [Loader:${loaderName}] ${args.request.method} ${url.pathname}`);

    try {
      const result = await handler(args);
      const duration = (performance.now() - start).toFixed(2);
      logger.info(`<-- [Loader:${loaderName}] Success (${duration}ms)`);
      return result;
    } catch (error) {
      const duration = (performance.now() - start).toFixed(2);
      logger.error(`<!- [Loader:${loaderName}] Error (${duration}ms)`, { error });
      throw error;
    }
  };
}
