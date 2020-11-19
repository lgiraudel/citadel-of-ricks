import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';

import CharacterDao, { Character, ExpandedCharacterDocument } from '@daos/CharacterDao';
import RealCharacterDao, { RealCharacterDocument } from '@daos/RealCharacterDao';

const router = Router();
const { OK } = StatusCodes;

router.get('/', async (req: Request, res: Response) => {
  const characters = await CharacterDao.find();
  return res.status(OK).json({ characters });
});

router.post('/', async (req: Request, res: Response) => {
  const character: Character = {
    name: req.body.name,
    combined_with: req.body.combined_with,
    gender: req.body.gender,
    species: req.body.species,
    type: req.body.type
  };
  const instance = await CharacterDao.create(character);
  return res.status(OK).json(instance);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await CharacterDao.deleteOne({ _id: req.params.id });
  return res.status(OK).json({});
});

router.get('/:id', async (req: Request, res: Response) => {
  const document = await CharacterDao.findById(req.params.id).exec();
  const character = document?.toObject() || {};

  if (character) {
    character.combined = await Promise.all(character?.combined_with?.map((id: number) => RealCharacterDao.findById(id)));
  }

  return res.status(OK).json(character);
})

export default router;