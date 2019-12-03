const express = require("express");
const { get, set, unset } = require("./utils/cmds");
const { readMasterPassword } = require("./utils/crypto");

const app = express();
const port = 8080;

// for parsing application/json
// http://expressjs.com/en/4x/api.html#express.json
app.use(express.json());

// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

const hash = readMasterPassword();

let invalidRequests = 0;
function addInvalidRequest() {
  invalidRequests++;
  if (invalidRequests > 5) {
    console.log("We should ban that user");
  }
}

app.get("/api/secrets/:key", async (request, response) => {
  const { key } = request.params;
  const { authorization } = request.headers;

  if (authorization !== hash) {
    addInvalidRequest();
    response.status(401).end("Not authorized");
    return;
  }

  try {
    const result = await get(key);
    response.json(result);
  } catch (error) {
    response.status(400).end("Can not read secret");
  }
});

app.post("/api/secrets/:key", async (request, response) => {
  const { key } = request.params;
  const { value } = request.body;

  await set(key, value);
  // Set the secret by key and value
  response.end(`${key} has new value`);
});

app.delete("/api/secrets/:key", async (request, response) => {
  const { key } = request.params;
  // Unset the secret by key
  await unset(key);

  response.end(`${key} has been deleted`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
