import * as jsonwebtoken from 'jsonwebtoken'
import { Secret } from 'jsonwebtoken'

import { Jwt } from '../../../shared/user/Jwt'
import { JwtDecoded } from '../../../shared/user/JwtDecoded'
import { JwtPayload } from '../../../shared/user/JwtPayload'

interface VerifySignedJwt {
  (jwt: Jwt): JwtPayload
}

export const verifySignedJwt: VerifySignedJwt = (jwt) => {
  const jwtDecoded: JwtDecoded = jsonwebtoken.decode(jwt) as JwtDecoded

  const verifyOptions = {
    issuer: 'TezosAcademy',
    subject: jwtDecoded ? jwtDecoded.username : undefined,
    audience: 'https://tezosacademy.io',
    expiresIn: '30d',
    algorithm: ['RS256'],
  }

  const jwtPayload: JwtPayload = jsonwebtoken.verify(
    jwt,
    process.env.JWT_PUBLIC_KEY as Secret,
    verifyOptions,
  ) as JwtPayload

  return jwtPayload
}
