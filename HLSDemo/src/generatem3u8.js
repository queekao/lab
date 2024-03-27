const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs").promises;
const readline = require("readline");
// this line sets the path to the FFmpeg binary installed by @ffmpeg-installer/ffmpeg
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

/**
 * Processes the input payloads from the user.
 * @param {string} folderName - The folderName
 * @param {string} fileName - The fileName
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question(
  "Please enter the folder where you want to store the compiled file: ",
  (folderName) => {
    fs.mkdir(`src/videos/${folderName}`, {recursive: true});
    console.log(`Folder create: ${folderName}`);
    rl.question(
      "Please enter the file where you want to complie ",
      (fileName) => {
        ffmpeg(`${__dirname}/videos/${fileName}`, {timeout: 432000})
          /**
           * -hls_time: Set length of segmented video in seconds.
           * -f: Set the format. Of course it should be ‘hls’
           */
          .addOptions([
            "-profile:v baseline",
            "-level 3.0",
            "-start_number 0",
            "-hls_time 10",
            "-hls_list_size 0",
            "-f hls",
          ])
          .output(`${__dirname}/videos/${folderName}/output.m3u8`)
          .on("end", () => {
            console.log("end");
            process.exit();
          })
          .on("error", (err, stdout, stderr) => {
            console.error("Error occurred: " + err.message);
            console.log("ffmpeg stdout:\n" + stdout);
            console.log("ffmpeg stderr:\n" + stderr);
          })
          .run();
        console.log(`file is compiling to .m3u8: ${fileName}`);
        rl.close();
      }
    );
  }
);
