import { IsDateString, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  serviceProviderId: number;

  @IsNumber()
  issueId: number;

  @IsDateString()
  scheduledAt: Date;
}
