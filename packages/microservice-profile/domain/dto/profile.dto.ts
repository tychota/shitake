import { IsDefined, IsString, Length } from 'class-validator';

export class ProfileDto {
  @IsDefined()
  @IsString()
  @Length(1, 50)
  readonly firstName!: string;

  @IsDefined()
  @IsString()
  @Length(1, 50)
  readonly lastName!: string;
}
