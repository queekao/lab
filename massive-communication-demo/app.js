const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("path");
const numberFormatter = spawn(
  path.join(__dirname, "main"),
  ["./dest.txt", "$", ","],
  {
    shell: true, // Use shell to execute the command for simplicity
    cwd: process.cwd(), // Current working directory
    env: process.env, // Use current environment variables
  }
);
numberFormatter.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});
numberFormatter.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});
numberFormatter.on("error", (err) => {
  console.log(err);
});
numberFormatter.on("close", (code) => {
  if (code === 0) {
    console.log("The file was read, processed and written successfully!");
  } else {
    console.log("Something bad happened!");
  }
});

// numberFormatter.stdin.end("ok"); // Sending EOF Sign
const fileStream = fs.createReadStream("./text-gigantic.txt");
fileStream.pipe(numberFormatter.stdin); // pipe data to another process
