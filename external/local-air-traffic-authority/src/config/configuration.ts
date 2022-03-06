export default () => ({
  // Service.
  port: parseInt(process.env.PORT, 10) || 5001,

  // Urban area.
  name: process.env.NAME || 'Unknown',
});
