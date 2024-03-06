import 'reflect-metadata';

import { IsDefined, IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { Get, JsonController, Params, Post, QueryParams, UseBefore } from 'routing-controllers';

import { getProfile } from '../../../middleware/middleware';
import { getUnpaidJobs, payForJob } from './controller';

class GetUnpaidJobsQuery {
  @Max(10)
  @Min(1)
  @IsDefined()
  limit: number;

  @IsNumber()
  @IsOptional()
  offset: number;
}

class PayForJobParam {
  @IsUUID(4)
  id: string;
}

@JsonController('/jobs')
@UseBefore(getProfile)
export class JobsController {
  @Get('/unpaid')
  list(@QueryParams() query: GetUnpaidJobsQuery) {
    return getUnpaidJobs(query.limit, query.offset);
  }

  @Post('/:id/pay')
  postOne(@Params() params: PayForJobParam) {
    return payForJob(params.id);
  }
}
