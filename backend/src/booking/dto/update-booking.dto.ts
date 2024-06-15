import { BookingStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateBookingDto {
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
