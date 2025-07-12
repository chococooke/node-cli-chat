import { io } from "socket.io-client";
import chalk from "chalk";

const socket = io("http://localhost:5000");
const username = process.argv[2];

const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const showPrompt = () => {
  process.stdout.write(chalk.cyan.bold(`[${getTime()}] ${username} > `));
};

socket.on("connect", () => {
  socket.emit("user", username);
  showPrompt();
});

socket.on("msg", (data) => {
  if (data.id === username) return;
  process.stdout.clearLine(-1);
  process.stdout.cursorTo(0);
  console.log(
    `${chalk.yellow(`[${getTime()}]`)} ${chalk.green.bold(`${data.id}`)} > ${data.msg}`
  );
  showPrompt();
});

process.stdin.on("data", (data) => {
  const message = data.toString().trim();
  if (message) socket.emit("msg", message);
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  showPrompt();
});