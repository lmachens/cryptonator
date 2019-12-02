const { get, set, unset } = require("./utils/cmds");
const { verifyHash, readMasterPassword } = require("./utils/crypto");
const userArgs = process.argv.slice(2);
const [masterPassword, cmd, key, value] = userArgs;

async function execute() {
  const hash = readMasterPassword();

  if (!verifyHash(masterPassword, hash)) {
    throw new Error("Invalid master password");
  }

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
