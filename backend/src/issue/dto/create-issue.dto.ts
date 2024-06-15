import { ServiceCategoryEnum } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

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

  @IsString()
  @IsNotEmpty()
  preferredDate: string;

  @IsString()
  @IsNotEmpty()
  preferredTime: string;

  @IsEnum(ServiceCategoryEnum)
  @IsNotEmpty()
  category: ServiceCategoryEnum;
}
