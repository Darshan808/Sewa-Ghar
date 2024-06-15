import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @Get(':id')
  getSingleBooking(@Param('id') id: string) {
    return this.bookingService.getSingleBooking(parseInt(id));
  }

  @Post()
  createBooking(@Body() dto: CreateBookingDto) {
    return this.bookingService.createBooking(dto);
  }

  @Patch(':id')
  updateBookingStatus(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.bookingService.updateBookingStatus(parseInt(id), dto.status);
  }

  @Delete(':id')
  deleteBooking(@Param('id') id: string) {
    return this.bookingService.deleteBooking(parseInt(id));
  }
}
