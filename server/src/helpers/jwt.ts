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

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) reject(new Error('Unauthorized'));
    else resolve(decoded);
  });
});

export { generateToken, verifyToken };
