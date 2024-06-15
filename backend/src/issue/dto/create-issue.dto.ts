import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIssueDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  price: number;
}
