import { MailDataRequired } from '@sendgrid/helpers/classes/mail'
import * as sendgrid from '@sendgrid/mail'

interface SendEmailVerifyEmail {
  (email: string, captchaIndex: number): Promise<void>
}

export const sendEmailVerifyEmail: SendEmailVerifyEmail = async (email, captchaIndex) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

  const message: MailDataRequired = {
    to: email,
    from: { name: 'TezosAcademy', email: process.env.FROM_EMAIL as string },
    subject: 'Please verify your email',
    text: `Please enter the following captcha https://b2.tezosacademy.io/file/tezosacademy/captchas/${captchaIndex}.png on https://tezosacademy.io/verify-email`,
    html: `Please enter the following captcha <br /><img alt="captcha" src="https://b2.tezosacademy.io/file/tezosacademy/captchas/${captchaIndex}.png" /> <br />on <a href="https://tezosacademy.io/verify-email">https://tezosacademy.io/verify-email</a>`,
  }

  await sendgrid.send(message)
}
