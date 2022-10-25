import jwt from 'jsonwebtoken';

const generateToken = (payload) => new Promise((resolve, reject) => {
  jwt.sign(
    payload,
    process.env.SECRET_KEY,
    (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    },
  );
});
export default generateToken;
