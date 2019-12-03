const { get, set, unset } = require("./utils/cmds");
const { verifyHash, readMasterPassword } = require("./utils/crypto");
const { askForPassword, waitFor } = require("./utils/input");

const userArgs = process.argv.slice(2);
const [cmd, key, value] = userArgs;

async function execute() {
  try {
    const hash = readMasterPassword();
    const password = await askForPassword();

    await waitFor(1000);

    if (!verifyHash(password, hash)) {
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
  } catch (error) {
    console.error("Oh no!", error);
  }
}

execute();
