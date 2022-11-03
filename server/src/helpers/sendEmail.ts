import nodemailer from 'nodemailer';

const sendEmail = (userInfo, subject, content) => {
  const { SECRET_EMAIL, SECRET_PASSWORD } = process.env;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: SECRET_EMAIL,
      pass: SECRET_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'cartredee@gmail.com',
    to: userInfo.email,
    subject,
    html: content,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return { status: 500 };
    }
    return '';
  });
};
export default sendEmail;
