import { Body, Controller, Get, Post } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';

@Controller('issues')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Get()
  listIssues() {
    return this.issueService.listIssues();
  }

  @Post()
  createIssue(@Body() dto: CreateIssueDto) {
    return this.issueService.createIssue(dto);
  }
}
