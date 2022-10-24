import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
  const tokenGenerate = new Promise((resolve, reject) => {
    jwt.sign(
      { role: 'user', payload },
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
  return tokenGenerate;
};
export default generateToken;
