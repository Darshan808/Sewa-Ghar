import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateServiceProviderDto } from "./dto/create-service-provider.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register/user")
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post("register/service-provider")
  registerServiceProvider(
    @Body() createServiceProviderDto: CreateServiceProviderDto
  ) {
    return this.authService.registerServiceProvider(createServiceProviderDto);
  }

  @Post("/login/user")
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Post("/login/service-provider")
  loginServiceProvider(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginServiceProvider(loginUserDto);
  }
}
