const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askForPassword() {
  return new Promise((resolve, reject) => {
    readlineInterface.question("Please enter password:", password => {
      // Add line break
      readlineInterface.output.write("\n");
      if (password.length === 0) {
        reject("Password is empty");
      } else {
        resolve(password);
      }
      readlineInterface.close();
    });
    // Override default output to hide password
    readlineInterface._writeToOutput = function() {
      readlineInterface.output.write("");
    };
  });
}

function waitFor(milliseconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

exports.askForPassword = askForPassword;
exports.waitFor = waitFor;
