import { NextFunction, Request, Response } from 'express';
import httpContext from 'express-http-context';
import { InternalServerError, UnauthorizedError } from 'routing-controllers';

import logger from '../lib/logger';
import { Profile } from '../models/Profile';

export async function getProfile(request: Request, response: Response, next: NextFunction) {
  const profileId = request.headers.profile_id as string;

  if (!profileId) {
    response.status(403).send(new UnauthorizedError('No auth header found'));
    return;
  }

  try {
    const profile = await Profile.findByPk(profileId);

    if (!profile) {
      response.status(403).send(new UnauthorizedError('Profile not found'));
      return;
    }

    httpContext.set('profile', profile.get({ plain: true }));
    next();
  } catch (error) {
    logger.error(error);
    response.status(500).send(new InternalServerError('Failed to authenticate'));
  }
}
