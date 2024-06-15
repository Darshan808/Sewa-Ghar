import { IsNumber, IsString } from 'class-validator';

export class CreateResponseDto {
  @IsNumber()
  serviceProviderId: number;

  @IsString()
  message: string;
}
