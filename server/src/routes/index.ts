import { Router } from 'express';
import CharacterRouter from './Characters';
import RealCharacterRouter from './RealCharacters';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/characters', CharacterRouter);
router.use('/realcharacters', RealCharacterRouter);

// Export the base-router
export default router;
