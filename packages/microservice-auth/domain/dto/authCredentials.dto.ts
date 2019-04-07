import { IsString, IsDefined, IsEmail } from 'class-validator';

export class AuthClearTextCredentialsDto {
  @IsDefined()
  @IsEmail()
  readonly email!: string;

  @IsDefined()
  @IsString()
  readonly password!: string;
}

export class AuthHashedCredentialsDto {
  @IsDefined()
  @IsEmail()
  readonly email!: string;

  @IsDefined()
  @IsString()
  readonly hashedPassword!: string;
}
