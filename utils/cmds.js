const passwords = {
  wifi: 123,
  mac: "mac321"
};

function get(key) {
  return passwords[key];
}

function set(key, value) {
  passwords[key] = value;
}

function unset(key) {
  delete passwords[key];
}

// module.exports = {
//   get,
//   set,
//   unset
// }

exports.get = get;
exports.set = set;
exports.unset = unset;
