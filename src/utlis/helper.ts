import crypto from "crypto";
function createRandomBytes() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buf) => {
      if (err) reject(err);
      const token = buf.toString("hex");
      resolve(token);
    });
  });
}

export {createRandomBytes}