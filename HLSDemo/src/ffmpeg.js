const ffmpeg = require("fluent-ffmpeg");
// this line sets the path to the FFmpeg binary installed by @ffmpeg-installer/ffmpeg
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
/**
 * -hls_time: Set length of segmented video in seconds.
 * -f: Set the format. Of course it should be ‘hls’
 */
ffmpeg(`${__dirname}/videos/ICSA2023.mp4`, {timeout: 432000})
  .addOptions([
    "-profile:v baseline",
    "-level 3.0",
    "-start_number 0",
    "-hls_time 10",
    "-hls_list_size 0",
    "-f hls",
  ])
  .output(`${__dirname}/videos/output.m3u8`)
  .on("end", () => {
    console.log("end");
  })
  .on("error", (err, stdout, stderr) => {
    console.error("Error occurred: " + err.message);
    console.log("ffmpeg stdout:\n" + stdout);
    console.log("ffmpeg stderr:\n" + stderr);
  })
  .run();
