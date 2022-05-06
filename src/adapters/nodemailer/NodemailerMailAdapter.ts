import { MailAdapter, SendEmailData } from "../MailAdapter"
import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4ca1b3671d833d",
    pass: "bc159028fdeec2",
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendEmailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com.br>",
      to: "Simão Meyrer <simao@gmail.com>",
      subject: subject,
      html: body,
    })
  }
}
