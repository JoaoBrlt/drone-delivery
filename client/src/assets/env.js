(function(window) {
  window['env'] = window['env'] || {};

  // Environment.
  window['env']['NODE_ENV'] = 'development';

  // Tracking router.
  window['env']['TRACKING_ROUTER_HOST'] = 'localhost';
  window['env']['TRACKING_ROUTER_PORT'] = '3004';

  // Alert router.
  window['env']['ALERT_ROUTER_HOST'] = 'localhost';
  window['env']['ALERT_ROUTER_PORT'] = '3011';

  // Air traffic authority.
  window['env']['AIR_TRAFFIC_AUTHORITY_HOST'] = 'localhost';
  window['env']['AIR_TRAFFIC_AUTHORITY_PORT'] = '5000';

  // Network coverage.
  window['env']['NETWORK_COVERAGE_API_HOST'] = 'localhost';
  window['env']['NETWORK_COVERAGE_API_PORT'] = '5003';
})(this);
