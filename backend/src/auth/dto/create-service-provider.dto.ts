import { ServiceCategoryEnum } from "@prisma/client";
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsArray,
  IsEnum,
} from "class-validator";

export class CreateServiceProviderDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  bio: string;

  @IsArray()
  @IsEnum(ServiceCategoryEnum, { each: true })
  services: ServiceCategoryEnum[];
}
