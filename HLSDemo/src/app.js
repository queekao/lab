// https://www.npmjs.com/package/hls-server
const express = require("express");
const fs = require("fs");
const path = require("path");
const hls = require("hls-server");
const app = express();
// app.get("/", (req, res) => {
//   return res.status(200).sendFile(`${__dirname}/client.html`);
// });
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all domains
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/video/:folderName/:fileName", (req, res) => {
  const folderName = req.params.folderName;
  const fileName = req.params.fileName;
  let contentType;

  if (fileName.endsWith(".m3u8")) {
    contentType = "application/vnd.apple.mpegurl";
  } else if (fileName.endsWith(".ts")) {
    contentType = "video/MP2T";
  }

  const filePath = path.join(
    __dirname,
    `videos/${folderName}`,
    fileName.startsWith("segment") ? "segments" : "",
    fileName
  );

  fs.exists(filePath, (exists) => {
    if (exists) {
      res.setHeader("Content-Type", contentType);
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    } else {
      console.error("File not found:", filePath);
      res.sendStatus(404);
    }
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
// For server-side directly serve the .m3u8
// new hls(server, {
//   // load m3u8 from server-side
//   provider: {
//     exists: (req, cb) => {
//       const ext = req.url.split(".").pop();
//       if (ext !== "m3u8" && ext !== "ts") {
//         return cb(null, true);
//       }

//       fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
//         // test user permission
//         if (err) {
//           console.log("File not exist");
//           return cb(null, false);
//         }
//         cb(null, true);
//       });
//     },
//     getManifestStream: (req, cb) => {
//       // For request from .m3u8
//       const stream = fs.createReadStream(__dirname + req.url);
//       cb(null, stream);
//     },
//     getSegmentStream: (req, cb) => {
//       // For request from .ts
//       const stream = fs.createReadStream(__dirname + req.url);
//       cb(null, stream);
//     },
//   },
// });
