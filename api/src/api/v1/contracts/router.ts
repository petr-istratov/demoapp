import 'reflect-metadata';

import { IsDefined, IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { Controller, Get, Params, QueryParams, UseBefore } from 'routing-controllers';

import { getProfile } from '../../../middleware/middleware';
import { getContract, getContractsList } from './controller';

class GetContractsQuery {
  @Max(10)
  @Min(1)
  @IsDefined()
  limit: number;

  @IsNumber()
  @IsOptional()
  offset: number;
}

class GetContractParam {
  @IsUUID(4)
  id: string;
}

@Controller('/contracts')
@UseBefore(getProfile)
export class ContractsController {
  @Get('/:id')
  getOne(@Params() params: GetContractParam) {
    return getContract(params.id);
  }

  @Get('/')
  list(@QueryParams() query: GetContractsQuery) {
    return getContractsList(query.limit, query.offset);
  }
}
