const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api', createProxyMiddleware({
        target: 'https://artemiswebapi.azurewebsites.net',
        changeOrigin: true,
    }));
};
