import { IsDefined, IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  @Length(1, 50)
  public readonly firstName!: string;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  @Length(1, 50)
  public readonly lastName!: string;
}
