const fs = require("fs");
const { hashPassword } = require("./utils/crypto");

const password = process.argv[2];
const hashedPassword = hashPassword(password);
fs.writeFileSync(".password", hashedPassword);
