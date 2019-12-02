const fs = require("fs");

const passwordFileName = ".passwords.json";

function readPasswords() {
  return new Promise(resolve => {
    fs.readFile(passwordFileName, "utf-8", (error, passwordJSON) => {
      if (error) {
        return resolve({});
      }
      try {
        const passwords = JSON.parse(passwordJSON);
        resolve(passwords);
      } catch (error) {
        console.error(`Invalid ${passwordFileName}`);
        resolve({});
      }
    });
  });
}

function writePasswords(passwords) {
  fs.writeFile(passwordFileName, JSON.stringify(passwords, null, 2), error => {
    if (error) {
      console.error(error);
    }
  });
}

async function get(key) {
  const passwords = await readPasswords();
  return passwords[key];
}

async function set(key, value) {
  const passwords = await readPasswords();
  passwords[key] = value;
  writePasswords(passwords);
}

async function unset(key) {
  const passwords = await readPasswords();
  delete passwords[key];
  writePasswords(passwords);
}

// module.exports = {
//   get,
//   set,
//   unset
// }

exports.get = get;
exports.set = set;
exports.unset = unset;
