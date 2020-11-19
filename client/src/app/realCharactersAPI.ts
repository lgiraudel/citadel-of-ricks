import { RealCharacter } from './models/realCharacter';
import { api } from './env';

const find = async (): Promise<Array<RealCharacter>> => {
  const res = await fetch(`${api}/realcharacters/`);

  const characters = await res.json();
  return characters.realCharacters;
}

export {
  find,
};
