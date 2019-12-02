const { get, set, unset } = require("./utils/cmds");

const userArgs = process.argv.slice(2);
const [cmd, key, value] = userArgs;

async function execute() {
  switch (cmd) {
    case "get":
      {
        const result = await get(key);
        console.log(result);
      }
      break;

    case "set":
      await set(key, value);
      break;

    case "unset":
      await unset(key);
      break;

    default:
      console.error("Unknown command");
  }
}

execute();
