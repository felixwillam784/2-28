import jwt from 'jsonwebtoken';

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) reject(new Error('Unauthorized'));
    else resolve(decoded);
  });
});

export default verifyToken;
