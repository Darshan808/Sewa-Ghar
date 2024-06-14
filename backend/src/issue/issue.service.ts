import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIssueDto } from './dto/create-issue.dto';

@Injectable()
export class IssueService {
  constructor(private prisma: PrismaService) {}
  listIssues() {
    return this.prisma.user.findMany({
      include: {
        issues: true,
      },
    });
  }

  async createIssue(dto: CreateIssueDto) {
    const service = await this.prisma.issue.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId: dto.userId,
      },
    });

    return service;
  }
}
