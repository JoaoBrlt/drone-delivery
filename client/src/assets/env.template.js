(function(window) {
  window['env'] = window['env'] || {};

  // Environment.
  window['env']['NODE_ENV'] = '${NODE_ENV}';

  // Tracking router.
  window['env']['TRACKING_ROUTER_HOST'] = '${TRACKING_ROUTER_HOST}';
  window['env']['TRACKING_ROUTER_PORT'] = '${TRACKING_ROUTER_PORT}';

  // Alert router.
  window['env']['ALERT_ROUTER_HOST'] = '${ALERT_ROUTER_HOST}';
  window['env']['ALERT_ROUTER_PORT'] = '${ALERT_ROUTER_PORT}';

  // Air traffic authority.
  window['env']['AIR_TRAFFIC_AUTHORITY_HOST'] = '${AIR_TRAFFIC_AUTHORITY_HOST}';
  window['env']['AIR_TRAFFIC_AUTHORITY_PORT'] = '${AIR_TRAFFIC_AUTHORITY_PORT}';

  // Network coverage.
  window['env']['NETWORK_COVERAGE_API_HOST'] = '${NETWORK_COVERAGE_API_HOST}';
  window['env']['NETWORK_COVERAGE_API_PORT'] = '${NETWORK_COVERAGE_API_PORT}';
})(this);
