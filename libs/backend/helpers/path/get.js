const path = require("path");

const root = (...args) => {
  return path.resolve(process.cwd(), ...args);
}

const rootRepo = (...args) => {
    return root('./../../../../', ...args)
}

exports.root = root;
exports.rootRepo = rootRepo;