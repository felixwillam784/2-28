import bcrypt from 'bcryptjs';

const passwordCompare = (password:string, hash:string) => {
  const isTrue = new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
  return isTrue;
};
export default passwordCompare;
