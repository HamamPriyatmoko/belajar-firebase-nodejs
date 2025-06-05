import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587, // Port untuk TLS
  auth: {
    user: 'apikey',
    pass: process.env.SEND_GRID_KEY,
  },
});

async function sendEmailVerification(email, username, verificationLink) {
  const mailOptions = {
    from: 'hamampriyatmoko81@gmail.com',
    to: email,
    subject: 'Verifikasi Email Anda',
    text: `Klik link berikut untuk memverifikasi email Anda: ${verificationLink}`,
    html: `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #007BFF;">Tolong Verifikasi Alamat Email Anda</h2>
          <p>Hi, ${username}</p>
          <p>Terima kasih telah mendaftar di aplikasi kami. Untuk menyelesaikan proses pendaftaran, silakan klik tombol di bawah ini untuk memverifikasi alamat email Anda:</p>
          <p style="text-align: center;">
            <a href="${verificationLink}" style="background-color: #007BFF; color: #fff; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px;">
              Verifikasi Email
            </a>
          </p>
          <p>Jika Anda tidak mendaftar di aplikasi kami, Anda dapat mengabaikan email ini.</p>
          <p>Terima kasih,<br> Tim Aplikasi</p>
          <footer style="text-align: center; font-size: 12px; color: #888;">
            <p>Ini adalah email otomatis, harap tidak membalas pesan ini.</p>
          </footer>
        </div>
      </body>
    </html>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email verifikasi terkirim:', info.response);
    return info.response;
  } catch (error) {
    console.error('Error mengirimkan email:', error);
    throw new Error(`Error saat mengirimkan email:`, error);
  }
}

export default sendEmailVerification;
