const { get, set, unset } = require("./utils/cmds");

const userArgs = process.argv.slice(2);
const [cmd, key, value] = userArgs;

switch (cmd) {
  case "get":
    {
      const result = get(key);
      console.log(result);
    }
    break;

  case "set":
    set(key, value);
    break;

  case "unset":
    unset(key);
    break;

  default:
    console.error("Unknown command");
}
