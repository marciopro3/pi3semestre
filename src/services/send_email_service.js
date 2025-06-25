require('dotenv').config()
const nodemailer = require('nodemailer');

module.exports = async function sendResetEmail(to, code) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.SECRET_EMAIL
    }
  });

  //const resetLink = `https://seusite.com/reset-password?token=${token}`;

  const mailOptions = {
    from: ' "API - Gestão de Usuários"<profnivaldoandradeetec@gmail.com>',
    to: to,
    subject: 'Recuperação de senha',
    text: `Você solicitou a recuperação de senha. Use este código: ${code}`,
    //html: `<p>Você solicitou a recuperação de senha.</p><p><a href="${resetLink}">Clique aqui para redefinir sua senha</a></p>`
  };

  await transporter.sendMail(mailOptions);
}

