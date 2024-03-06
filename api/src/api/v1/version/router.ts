import 'reflect-metadata';

import { Controller, Get, UseBefore } from 'routing-controllers';

import { getProfile } from '../../../middleware/middleware';

@Controller()
@UseBefore(getProfile)
export class AppController {
  @Get('/')
  getVersion() {
    return 'v1';
  }
}
