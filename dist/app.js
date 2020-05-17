"use strict";

var _https = _interopRequireDefault(require("https"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var keyPath = _path["default"].join(__dirname, "..", "certs", "key.pem");

var certPath = _path["default"].join(__dirname, "..", "certs", "cert.pem");

var httpsOptions = {
  key: _fs["default"].readFileSync(keyPath),
  cert: _fs["default"].readFileSync(certPath)
};

var httpsServer = _https["default"].createServer(httpsOptions, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
});

var port = process.env.PORT;
var hostname = process.env.HOSTNAME;
httpsServer.listen(port, hostname, function () {
  switch (process.env.NODE_ENV) {
    case "development":
      {
        console.log("Development Server running on port ".concat(port));
        break;
      }

    case "staging":
      {
        console.log("Staging Server running on port ".concat(port));
        break;
      }

    case "production":
      {
        console.log("Production Server running on port ".concat(port));
        break;
      }

    default:
      {
        console.log("Server Exit. Please check whather you set NODE_ENV");
        process.exit(0);
      }
  }
});