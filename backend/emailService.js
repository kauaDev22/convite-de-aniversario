const nodemailer = require('nodemailer');

// Aqui você pode configurar com Gmail, Outlook ou SMTP da sua empresa
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seuemail@gmail.com',
    pass: 'suasenhaouapppassword'
  }
});

async function enviarEmailConfirmacao(destinatario, nome) {
  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: destinatario,
    subject: 'Confirmação de Convite',
    text: `Olá ${nome}, seu convite foi confirmado com sucesso!`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado para', destinatario);
    return true;
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return false;
  }
}

module.exports = { enviarEmailConfirmacao };