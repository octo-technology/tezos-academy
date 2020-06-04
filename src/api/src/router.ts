import * as Router from '@koa/router'
import { Context } from 'koa'

import { signUp } from './resolvers/user/signUp/signUp'
import { login } from './resolvers/user/login/login'
import { verifyEmail } from './resolvers/user/verifyEmail/verifyEmail'
import { resetPassword } from './resolvers/user/resetPassword/resetPassword'
import { resendEmailVerification } from './resolvers/user/resendEmailVerification/resendEmailVerification'
import { getPublicUser } from './resolvers/user/getPublicUser/getPublicUser'
import { forgotPassword } from './resolvers/user/forgotPassword/forgotPassword'
import { changePassword } from './resolvers/user/changePassword/changePassword'

const router = new Router()

router.get('/', async (ctx: Context) => {
  ctx.body = 'You are not supposed to be here ;)'
})

router.post('/user/sign-up', signUp)
router.post('/user/login', login)
router.post('/user/verify-email', verifyEmail)
router.post('/user/resend-email-verification', resendEmailVerification)
router.post('/user/get-public-user', getPublicUser)
router.post('/user/reset-password', resetPassword)
router.post('/user/forgot-password', forgotPassword)
router.post('/user/change-password', changePassword)

export { router }
