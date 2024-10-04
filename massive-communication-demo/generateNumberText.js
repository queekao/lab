const fs = require("node:fs/promises");
const args = process.argv.slice(2);
(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("text-gigantic.txt", "w");
  const stream = fileHandle.createWriteStream();
  let i = 0;
  const numberOfWrites = +args[0];
  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, "utf-8");

      // this is our last write
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      // if stream.write returns false, stop the loop
      if (!stream.write(buff)) break;

      i++;
    }
  };

  writeMany();

  // resume our loop once our stream's internal buffer is emptied
  stream.on("drain", () => {
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("writeMany");
    fileHandle.close();
  });
})();
