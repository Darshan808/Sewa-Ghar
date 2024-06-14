import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register/user')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto, Role.CUSTOMER);
  }

  @Post('register/service-provider')
  registerServiceProvider(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto, Role.SERVICE_PROVIDER);
  }

  @Post('/login/user')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto, Role.CUSTOMER);
  }

  @Post('/login/service-provider')
  loginServiceProvider(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto, Role.SERVICE_PROVIDER);
  }
}
