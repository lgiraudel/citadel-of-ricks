export type RealCharacter = {
  name: string;
  gender: string;
  type: string;
  id: number;
  url: string;
  origin: {
    name: string;
    url: string;
  },
  status: string;
  species: string;
  location: {
    name: string;
    url: string;
  },
  image: string;
  episode: Array<string>;
}
