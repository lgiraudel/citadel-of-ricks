import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';

import RealCharacterDao from '@daos/RealCharacterDao';

const router = Router();
const { OK } = StatusCodes;

router.get('/', async (req: Request, res: Response) => {
  const realCharacters = await RealCharacterDao.find();
  return res.status(OK).json({ realCharacters });
});

export default router;