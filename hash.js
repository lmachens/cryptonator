const fs = require("fs");
const { askForPassword } = require("./utils/input");
const { hashPassword } = require("./utils/crypto");

askForPassword().then(password => {
  const hashedPassword = hashPassword(password);
  fs.writeFileSync(".password", hashedPassword);

  console.log("New password saved");
});
