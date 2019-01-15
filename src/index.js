const generate = require("./generate");
const program = require("commander");

program
  .option("-f, --file <filePath>", "file to process")
  .option(
    "-o, --output <filePath>",
    "output path of the processed file",
    "./css-by-js.js"
  )
  .parse(process.argv);

generate(program.file, program.output).then(function(outputPath) {
  console.log(`Success! JS file generated here: ${outputPath}`);
});
