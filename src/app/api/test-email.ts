import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.uni5.net",
  port: 587, 
  secure: false,
  auth: {
    user: "contato@hotelrealcabofrio.com.br",
    pass: process.env.EMAIL_PASSWORD, 
  },
});

export async function GET() {
  try {
    const info = await transporter.sendMail({
      from: '"Hotel Real Cabo Frio" <contato@hotelrealcabofrio.com.br>',
      to: "seu-email-pessoal@gmail.com", 
      subject: "Teste de envio SMTP",
      text: "Se você recebeu este e-mail, o envio está funcionando 🚀",
    });

    console.log("Email enviado:", info);

    return NextResponse.json({ success: true, info });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
