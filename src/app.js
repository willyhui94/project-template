import https from "https";
import fs from "fs";
import path from "path";

import dotenv from 'dotenv';
dotenv.config();

const keyPath = path.join(__dirname, "..", "certs", "key.pem");
const certPath = path.join(__dirname, "..", "certs", "cert.pem");

const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

const httpsServer = https.createServer(httpsOptions, (req, res) => {
  res.writeHead(200);
  res.end("hello world\n");
});

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

httpsServer.listen(port, hostname, () => {
  switch (process.env.NODE_ENV) {
    case "development": {
      console.log(`Development Server running on port ${port}`);
      break;
    }
    case "staging": {
      console.log(`Staging Server running on port ${port}`);
      break;
    }
    case "production": {
      console.log(`Production Server running on port ${port}`);
      break;
    }
    default: {
      console.log(`Server Exit. Please check whather you set NODE_ENV`);
      process.exit(0);
    }
  }
});

