import { IsString, IsDefined, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthClearTextCredentialsDto {
  @ApiModelProperty()
  @IsDefined()
  @IsEmail()
  public readonly email!: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  public readonly password!: string;
}

export class AuthHashedCredentialsDto {
  @IsDefined()
  @IsEmail()
  public readonly email!: string;

  @IsDefined()
  @IsString()
  public readonly hashedPassword!: string;
}
