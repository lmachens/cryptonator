const [cmd, key, value] = process.argv.slice(2);

const passwords = {
  wifi: 123,
  mac: "mac321"
};

switch (cmd) {
  case "get":
    console.log(passwords[key]);
    break;

  case "set":
    console.log("set");
    passwords[key] = value;
    break;

  case "unset":
    console.log("unset");
    delete passwords[key];
    break;

  default:
    console.error("Unknown command");
}

console.log(passwords);
