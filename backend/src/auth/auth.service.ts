import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateServiceProviderDto } from "./dto/create-service-provider.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerUser(dto: CreateUserDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password: hash,
        },
        include: {
          bookings: true,
          issues: true,
          reviews: true,
        },
      });

      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          throw new ForbiddenException(
            "User with this credentials already exists"
          );
        }
      }
      throw error;
    }
  }

  async registerServiceProvider(dto: CreateServiceProviderDto) {
    try {
      const hash = await argon.hash(dto.password);
      const serviceProvider = await this.prisma.serviceProvider.create({
        data: {
          ...dto,
          password: hash,
        },
        include: {
          bookings: true,
          responses: true,
          reviews: true,
        },
      });

      delete serviceProvider.password;
      return serviceProvider;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          throw new ForbiddenException(
            "User with this credentials already exists"
          );
        }
      }
      throw error;
    }
  }

  async loginUser(dto: LoginUserDto) {
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

    if (!user) throw new ForbiddenException("Invalid credentials");
    const matched = await argon.verify(user.password, dto.password);
    if (!matched) throw new ForbiddenException("Invalid credentials");
    delete user.password;
    return user;
  }

  async loginServiceProvider(dto: LoginUserDto) {
    const serviceProvider = await this.prisma.serviceProvider.findUnique({
      where: {
        email: dto.email,
      },
      include: {
        reviews: true,
        responses: true,
        bookings: true,
      },
    });

    if (!serviceProvider) throw new ForbiddenException("Invalid credentials");
    const matched = await argon.verify(serviceProvider.password, dto.password);
    if (!matched) throw new ForbiddenException("Invalid credentials");
    delete serviceProvider.password;
    return serviceProvider;
  }
}
