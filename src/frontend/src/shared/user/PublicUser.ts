import { IsDate, IsEmail, IsEnum, IsInt, IsMongoId, Length, Matches } from 'class-validator'
import { ObjectId } from 'mongodb'

import { UserRole } from './UserRole'

export class PublicUser {
  @IsMongoId()
  readonly _id!: ObjectId

  @Length(2, 20)
  @Matches(/^[a-zA-Z0-9_]*$/, { message: 'Username can only contain letters, numbers and underscores' })
  username!: string

  @IsEmail()
  emailVerified?: boolean

  @IsInt()
  karmaTotal?: number

  @IsEnum(UserRole)
  userRole?: UserRole

  @IsDate()
  createdAt!: Date
}
