import 'reflect-metadata';

import { IsDefined, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { Body, JsonController, Params, Post, UseBefore } from 'routing-controllers';

import { getProfile } from '../../../middleware/middleware';
import { deposit } from './controller';

class DepositBody {
  @IsNumber()
  @IsPositive()
  @IsDefined()
  amount: number;
}

class DepositParams {
  @IsUUID(4)
  userId: string;
}

@JsonController('/balances')
@UseBefore(getProfile)
export class BalancesController {
  @Post('/deposit/:userId')
  postOne(@Params() params: DepositParams, @Body() body: DepositBody) {
    return deposit(params.userId, body.amount);
  }
}
