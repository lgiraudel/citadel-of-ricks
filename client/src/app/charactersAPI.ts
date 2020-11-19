import { Character, ExpandedCharacter } from './models/character';
import { api } from './env';

const createCharacter = async (data: Character) => {
  const res = await fetch(`${api}/characters/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  return res.json();
};

const findCharacters = async (): Promise<Character[]> => {
  const res = await fetch(`${api}/characters/`);

  const json = await res.json();
  return json.characters as Character[];
}

const deleteCharacter = async (id: string): Promise<Response> => {
  return fetch(`${api}/characters/${id}`, {
    method: 'DELETE',
  })
}

const findCharacter = async (id: string): Promise<ExpandedCharacter> => {
  const res = await fetch(`${api}/characters/${id}`);

  return res.json();
}

export {
  createCharacter,
  findCharacters,
  deleteCharacter,
  findCharacter,
}