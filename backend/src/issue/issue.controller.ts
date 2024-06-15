import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { CreateResponseDto } from './dto/create-response.dto';

@Controller('issues')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Get()
  listIssues() {
    return this.issueService.listIssues();
  }

  @Get(':id')
  getSingleIssue(@Param('id') id: string) {
    return this.issueService.getIssue(parseInt(id));
  }

  @Get(':id/responses')
  getResponses(@Param('id') id: string) {
    return this.issueService.getResponses(parseInt(id));
  }

  @Post()
  createIssue(@Body() dto: CreateIssueDto) {
    return this.issueService.createIssue(dto);
  }

  @Post(':id/responses')
  addResponse(@Param('id') id: string, @Body() dto: CreateResponseDto) {
    return this.issueService.createResponse(dto, parseInt(id));
  }
}
