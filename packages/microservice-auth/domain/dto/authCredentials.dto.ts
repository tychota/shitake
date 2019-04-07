import { IsString, IsDefined, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthClearTextCredentialsDto {
  @ApiModelProperty()
  @IsDefined()
  @IsEmail()
  readonly email!: string;

  @ApiModelProperty()
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
