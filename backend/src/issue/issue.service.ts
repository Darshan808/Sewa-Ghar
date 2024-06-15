import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { CreateResponseDto } from './dto/create-response.dto';

@Injectable()
export class IssueService {
  constructor(private prisma: PrismaService) {}
  listIssues() {
    return this.prisma.issue.findMany({
      include: {
        responses: true,
      },
    });
  }

  async createIssue(dto: CreateIssueDto) {
    const issue = await this.prisma.issue.create({
      data: {
        userId: dto.userId,
        title: dto.title,
        price: dto.price,
        description: dto.description,
      },
    });

    return issue;
  }

  async getIssue(id: number) {
    const issue = await this.prisma.issue.findUnique({
      where: { id },
      include: { responses: true },
    });

    if (!issue) throw new NotFoundException('Issue not found');
    return issue;
  }

  async getResponses(issueId: number) {
    return this.prisma.response.findMany({
      where: {
        issueId: issueId,
      },
    });
  }

  async createResponse(dto: CreateResponseDto, issueId: number) {
    return this.prisma.response.create({
      data: {
        issueId: issueId,
        serviceProviderId: dto.serviceProviderId,
        message: dto.message,
      },
    });
  }
}
