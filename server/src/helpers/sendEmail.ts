import nodemailer from 'nodemailer';

const sendEmail = (userInfo) => {
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
    subject: 'car trede team',
    html: `<div>
        <main>
            
            <p> Dear ${userInfo.fullName},<br/>
  <br/>
  We appreciate your patronage and your decision to purchase a vehicle from our website.<br/>
  <br/>
  Thanks again, <b>Your reservation was accepted. To finish the sale, kindly visit our showroom. 
  </b><br/>     <br/>
  Contact information:<br/>
          mobile: 0599504801;<br/>
          email: cartredee@gmail;
      </p>
        </main>
        <img src='' alt='compony logo'/>
    </div>`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return { status: 500 };
    }
    return '';
  });
};
export default sendEmail;
