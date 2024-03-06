import 'reflect-metadata';

import { IsDate, IsDefined, IsNumber, IsOptional } from 'class-validator';
import { Controller, Get, QueryParams, UseBefore } from 'routing-controllers';

import { getProfile } from '../../../middleware/middleware';
import { getBestClients, getBestProfession } from './controller';

class GetBestProfessionQuery {
  @IsDate()
  @IsDefined()
  start: Date;

  @IsDate()
  @IsDefined()
  end: Date;
}

class GetBestClientsQuery {
  @IsDate()
  @IsDefined()
  start: Date;

  @IsDate()
  @IsDefined()
  end: Date;

  @IsNumber()
  @IsOptional()
  limit: number;
}

@Controller('/admin')
@UseBefore(getProfile)
export class AdminController {
  @Get('/best-profession')
  getOne(@QueryParams() query: GetBestProfessionQuery) {
    return getBestProfession(query.start, query.end);
  }

  @Get('/best-clients')
  list(@QueryParams() query: GetBestClientsQuery) {
    return getBestClients(query.start, query.end, query.limit);
  }
}
