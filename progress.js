// const readline = require('readline');
import readline from "readline";

function updateProgress(percentage) {
  readline.clearLine(process.stdout, 0); // Clear the current line from the cursor to the end
  readline.cursorTo(process.stdout, 0); // Move the cursor to the beginning of the line
  process.stdout.write(`Downloading: ${percentage}%`); // Write the new progress
}

let progress = 0;
const interval = setInterval(() => {
  progress += 10;
  updateProgress(progress);
  if (progress >= 100) {
    clearInterval(interval);
    console.log("\nDownload complete!"); // Add a newline after the final update
  }
}, 500);
