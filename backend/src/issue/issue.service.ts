import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateIssueDto } from "./dto/create-issue.dto";
import { CreateResponseDto } from "./dto/create-response.dto";

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
        ...dto,
      },
    });

    return issue;
  }

  async getIssue(id: number) {
    const issue = await this.prisma.issue.findUnique({
      where: { id },
      include: { responses: true },
    });

    if (!issue) throw new NotFoundException("Issue not found");
    return issue;
  }

  async getResponses(issueId: number) {
    const issue = await this.prisma.issue.findUnique({
      where: { id: issueId },
    });
    if (!issue) throw new NotFoundException("Issue not found");
    return this.prisma.response.findMany({
      where: {
        issueId: issueId,
      },
    });
  }

  async createResponse(dto: CreateResponseDto, issueId: number) {
    const issueExists = await this.prisma.issue.findUnique({
      where: { id: issueId },
    });
    if (!issueExists) throw new NotFoundException("Issue not found");

    return this.prisma.response.create({
      data: {
        issueId: issueId,
        counterPrice: dto.counterPrice,
        message: dto.message,
        serviceProviderId: dto.serviceProviderId,
      },
    });
  }
}
