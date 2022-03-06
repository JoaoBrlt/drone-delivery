import { getEnv, toNumber } from './helpers';

export const environment = {
  // Environment.
  production: getEnv('NODE_ENV', 'development') === 'production',

  // Tracking router.
  trackingRouter: {
    host: getEnv('TRACKING_ROUTER_HOST', 'localhost'),
    port: toNumber(getEnv('TRACKING_ROUTER_PORT', '3004'))
  },

  // Alert router.
  alertRouter: {
    host: getEnv('ALERT_ROUTER_HOST', 'localhost'),
    port: toNumber(getEnv('ALERT_ROUTER_PORT', '3011'))
  },

  // Air traffic authority.
  airTrafficAuthority: {
    host: getEnv('AIR_TRAFFIC_AUTHORITY_HOST', 'localhost'),
    port: toNumber(getEnv('AIR_TRAFFIC_AUTHORITY_PORT', '3011'))
  },

  // Network coverage.
  networkCoverage: {
    host: getEnv('NETWORK_COVERAGE_API_HOST', 'localhost'),
    port: toNumber(getEnv('NETWORK_COVERAGE_API_PORT', '3011'))
  }
};
