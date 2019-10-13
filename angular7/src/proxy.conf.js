const PROXY_CONFIG = {
    "/api/*": {
        "target": "http://127.0.0.1:3000",
        "secure": false,
        "loglevel": "debug",
        "changeOrigin": true,
        "pathRewrite": {
            "^/api": ""
          }
    }
}

module.exports = PROXY_CONFIG;
