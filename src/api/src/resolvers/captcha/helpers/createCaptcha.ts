import { ObjectId } from 'mongodb'

import { Captcha, CaptchaModel } from '../../../shared/captcha/Captcha'
import { CaptchaFor } from '../../../shared/captcha/CaptchaFor'
import { CaptchaPair } from '../../../shared/captcha/CaptchaPair'
import { getRandomCaptchaPair } from './getRandomCaptchaPair'

interface CreateCaptcha {
  (userId: ObjectId, captchaFor: CaptchaFor): Promise<Captcha>
}

export const createCaptcha: CreateCaptcha = async (userId, captchaFor) => {
  await CaptchaModel.deleteOne({ userId, captchaFor })

  const captchaPair: CaptchaPair = getRandomCaptchaPair()

  const captcha: Captcha = await new CaptchaModel({
    userId,
    index: captchaPair.captchaIndex,
    solution: captchaPair.captchaSolution,
    captchaFor,
  }).save()

  return captcha
}
