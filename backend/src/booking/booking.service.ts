import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  getAllBookings() {
    return this.prisma.booking.findMany({
      include: {
        user: true,
        issue: true,
        serviceProvider: true,
      },
    });
  }

  async getSingleBooking(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        user: true,
        issue: true,
        serviceProvider: true,
      },
    });

    if (!booking) throw new NotFoundException('booking not found');
    return booking;
  }

  createBooking(dto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        userId: dto.userId,
        serviceProviderId: dto.serviceProviderId,
        issueId: dto.issueId,
        scheduledAt: dto.scheduledAt,
      },
      include: {
        user: true,
        issue: true,
        serviceProvider: true,
      },
    });
  }

  updateBookingStatus(id: number, status: BookingStatus) {
    return this.prisma.booking.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  deleteBooking(id: number) {
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
