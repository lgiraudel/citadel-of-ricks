import { RealCharacter } from "./realCharacter";

export type Character = {
  _id: string;
  name: string;
  combined_with: number;
  gender: string;
  species: string;
  type?: string;
}

interface ExpandedCharacter extends Character {
  combined: RealCharacter[];
}