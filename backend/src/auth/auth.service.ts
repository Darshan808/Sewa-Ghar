import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerUser(dto: CreateUserDto, role: Role) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          name: dto.name,
          phoneNumber: dto.phoneNumber,
          address: dto.address,
          role: role,
        },
        include: {
          bookings: true,
          issues: true,
          reviews: true,
        },
      });

      if (role == Role.SERVICE_PROVIDER) {
        await this.prisma.serviceProvider.create({
          data: {
            userId: user.id,
            bio: dto.bio,
            rating: dto.rating,
          },
        });
      }

      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException(
            'User with this credentials already exists',
          );
        }
      }
      throw error;
    }
  }

  async loginUser(dto: LoginUserDto, role: Role) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: {
          bookings: true,
          issues: true,
          reviews: true,
        },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');
    const matched = await argon.verify(user.password, dto.password);
    if (!matched) throw new ForbiddenException('Invalid credentials');

    if (role === Role.SERVICE_PROVIDER) {
      const serviceProvider = await this.prisma.serviceProvider.findUnique({
        where: {
          userId: user.id,
        },
        include: {
          user: true,
          services: true,
          reviews: true,
          responses: true,
          bookings: true,
        }
      });

      if (!serviceProvider) throw new ForbiddenException('Invalid credentials');
      return serviceProvider;
    }

    return user;
  }
}
