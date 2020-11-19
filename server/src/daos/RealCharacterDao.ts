import fetch from 'node-fetch';

export interface RealCharacterDocument {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  },
  location: {
    name: string;
    url: string;
  },
  image: string;
  episode: string[];
  url: string;
  created: string;
}

const RealCharacterDao = {
  async find(): Promise<RealCharacterDocument[]> {
    const nbPages = 20;
    const promises = Array(nbPages).fill(undefined).map((_, i) => fetch(`https://rickandmortyapi.com/api/character/?page=${i}`));
    const allPagesRes = await Promise.all(promises);
    const allJson = await Promise.all(allPagesRes.map(res => res.json()));
    return allJson.reduce((acc, curr) => acc.concat(curr.results), []);
  },

  async findById(id: number): Promise<RealCharacterDocument> {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const json = await res.json();

    return json;
  }
};

export default RealCharacterDao;
