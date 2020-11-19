import { Document, Schema, Model, model } from 'mongoose';
import { RealCharacterDocument } from './RealCharacterDao';

export interface Character {
  name: string;
  combined_with: Array<number>;
  gender: string;
  species: string;
  type?: string;
}
export interface CharacterDocument extends Character, Document {
}
export interface ExpandedCharacterDocument extends CharacterDocument {
  combined?: RealCharacterDocument[];
}
type CharacterModel = Model<CharacterDocument>

const CharacterSchema = new Schema({
  name: String,
  gender: String,
  species: String,
  type: String,
  combined_with: [Number]
});

export default model<CharacterDocument, CharacterModel>('Character', CharacterSchema);
